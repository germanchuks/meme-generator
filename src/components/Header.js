import trollFace from '../images/trollFace.svg'

export default function Header() {
    return (
        <div className="header">
            <div className="header-title">
                <img src={trollFace} alt='Troll Face'/>
                <span className="header-title-text">Meme Generator</span>
            </div>
            <div className="header-sub">React Course - Project 3</div>
        </div>
    )
}