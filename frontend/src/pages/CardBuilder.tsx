const FontStyle = {color: 'white', textDecoration: 'none'}


function NavBarTest () {
    return (
        <>
            <div style={{backgroundColor: '#303236', width: '5%', height: '100%', display: 'flex', flexDirection: 'column', position: 'fixed', justifyContent: 'center', rowGap: '100px', alignItems: 'center'}}>
                <a href="#" target="_blank" style={FontStyle}>Home</a>
                <a href="#" target="_blank" style={FontStyle}>Card Builder</a>
                <a href="#" target="_blank" style={FontStyle}>Share</a>
                <a href="#" target="_blank" style={FontStyle}>etc</a>
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