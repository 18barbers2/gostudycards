import '../css/Card.css'

//TODO: add in an interface for CardProps
import { parseTemplate } from "../utils/templateParser";

// TODO: replace props with the template and data props
function Card( props : any) {

    const template = props.template;
    const html = parseTemplate(props.template, props.data);

    return( 
        <iframe className='card'
            title='Card'
            sandbox=""
            srcDoc={html}>
        </iframe>

    );
}

export default Card;