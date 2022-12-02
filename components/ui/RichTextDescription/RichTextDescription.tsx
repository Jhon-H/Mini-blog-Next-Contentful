import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { IRichTextStructGraphql } from 'interface/richText'

const renderOptions = (links: Object[]): Options => {
  return {
    renderMark: {
      [MARKS.BOLD]: text => {
        return <strong>{text}</strong>
      },
      [MARKS.CODE]: text => {
        return <code className=' bg-gray-300 font-mono'>{text}</code>
      }
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p>{children}</p>
      },
      [INLINES.HYPERLINK]: (node, children) => {
        return (
          <a
            href={node.data.uri}
            target={node.data.uri.startsWith("https://") ? "_blank" : "_self"}
            rel={node.data.uri.startsWith("https://") ? "noopener noreferrer" : ""}
            className="text-blue-500"
          >
            {children}
          </a>
        )
      },
      [BLOCKS.HR]: () => {
        return <hr className='bg-gray-800' />
      },
    },
    renderText: text => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
  }
}

interface Props {
  richTextResponse: IRichTextStructGraphql
}

export const RichTextDescription = ({ richTextResponse }: Props) => (
  <>
    {
      documentToReactComponents(
        richTextResponse.json,
        renderOptions(richTextResponse.links)
      )
    }
  </>
)