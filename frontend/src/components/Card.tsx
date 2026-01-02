//TODO: add in an interface for CardProps

function Card( props : any) {

    const html = props.html;

    return( 
        <div className="card">
            <div dangerouslySetInnerHTML={{ __html : html }}></div>
        </div>
    );
}

export default Card;