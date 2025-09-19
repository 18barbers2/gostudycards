<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>


const FontStyle = {color: 'white', textDecoration: 'none'}


function NavBarTest () {

    return (
        <>
            <div style={{backgroundColor: '#303236', left: '0', top: '0', width: '250px', height: '100%', display: 'flex', flexDirection: 'column', position: 'fixed', justifyContent: 'center', rowGap: '100px', alignItems: 'center'}}>
                <a href="#home" target="_blank" style={FontStyle} className="fa fa-fw fa-home">Home</a>
                <a href="#builder" target="_blank" style={FontStyle}><i className="fa fa-fw fa-home"></i>Card Builder</a>
                <a href="#share" target="_blank" style={FontStyle} className="fa fa-fw fa-home">Share</a>
                <a href="#etc" target="_blank" style={FontStyle} className="fa fa-fw fa-home">etc</a>
            </div>
        </>
    );
}


export default function CardBuilder() {
    return (
        <div>
            {/* <h1>Card Builder</h1> */}
            <NavBarTest></NavBarTest>
        </div>
    );
}