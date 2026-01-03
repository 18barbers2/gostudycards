//TODO: add in an interface for CardProps
const iFrameStyle = {backgroundColor: '#e5e5e5ff', border: '0', width: '60%', height: '500px', borderRadius: '10px'};

import { parseTemplate } from "../utils/templateParser";

// TODO: replace props with the template and data props
function Card( props : any) {

    const template = props.template;
    const html = parseTemplate(props.template, props.data);

    return( 
        <div className="card">
            <iframe 
                title='Card'
                sandbox=""
                style={iFrameStyle}
                srcDoc={html}>
            </iframe>
        </div>
    );
}

export default Card;