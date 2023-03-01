import {useState, useEffect} from 'react'


export default function MemeDisplay() {
    
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    
    //Initialize State to hold store array
    const [memeData, setMemeData] = useState([])

    //Get images array from API and assign to state
    useEffect(() => {
        async function getMeme() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setMemeData(data.data.memes)
        }
        getMeme()
        
    }, [])


    //Store text input to state
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    
    //Get random meme from array
    function handleSubmit(event) {
        event.preventDefault()
        
        //Get random image url from  state
        const randomNumber = Math.floor(Math.random() * memeData.length);
        const url = memeData[randomNumber].url
        
        //Set random image to state
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))

    }


    return (
        <div className="meme--display" >
            <form onSubmit={handleSubmit} className="form">
                <span className="form-input">
                    <input 
                        type="text" 
                        className="form-input-top" 
                        placeholder='Top Text' 
                        name='topText' 
                        value={meme.topText}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        className="form-input-bottom" 
                        placeholder='Bottom Text' 
                        name='bottomText' 
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </span>
                <button className="form-button">
                    Get a new meme image  🖼
                </button>
            </form>
            
            <div className='meme--image--container'>
                <img src= {meme.randomImage} className='meme--image' alt='Meme'/>
                <h2 className='meme-text-top'>{meme.topText}</h2>
                <h2 className='meme-text-bottom'>{meme.bottomText}</h2>
            </div>
            
        </div>
    )
}