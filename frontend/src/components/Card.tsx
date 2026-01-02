//TODO: add in an interface for CardProps

function Card( props : any) {

    const template = props.template;

    return( 
        <div className="card">
            <div dangerouslySetInnerHTML={{ __html : template }}></div>
        </div>
    );
}

export default Card;