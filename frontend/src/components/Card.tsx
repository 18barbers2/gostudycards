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
                        min-height: 100vh;
                        background: #0f1b35;
                        background: linear-gradient(135deg, #0f1b35 0%, #1a3a6b 50%, #0d2d55 100%);
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