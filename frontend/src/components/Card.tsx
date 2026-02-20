import '../css/Card.css'

//TODO: add in an interface for CardProps
import { parseTemplate } from "../utils/templateParser";

interface CardProps {
    id: string;
    deckId: string;
    template: string;
    data: Record<string, string>;
    style?: string;
}

// TODO: replace props with the template and data props
function Card( props : CardProps) {

    const html = parseTemplate(props.template, props.data);

    const baseDoc = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Card Document</title>
                <style>
                    html, body { margin:0; padding:0; overflow: hidden; }
                    body {
                        font-size: 25px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        white-space: pre-wrap;
                        background-color: #e5e5e5ff;
                        border-width: 0;
                        height: 500px;
                        border-radius: 10px;
                        background: #3F5EFB;
                        background: linear-gradient(62deg,rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%);
                    }
                    ${props.style ?? ''}
                </style>
            </head>
            <body>${html}</body>
            </html>`;




    return( 
        <iframe className='card-iframe'
            title='Card'
            sandbox=''
            srcDoc={baseDoc}>
        </iframe>
    );
}

export default Card;