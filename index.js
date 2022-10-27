
//Color generator
function colorCreator() {
  const colorItems = ['A','B','C','D','F','0','1','2','3','4','5','6','7','8','9']
  let color = ''
  for(let i=0;i<7;i++){

    let n = Math.floor(Math.random()*colorItems.length);
    i=== 0 ? color+="#" : color+=colorItems[n] 
  }
  return color 
}
  
//Color's state generator
function arrayCreator(){ 
  let colors = []
  for(let i=0;i<3;i++){
    colors.push(colorCreator())
  }

  return colors
} 


function App(){
  const [colors,setColors] = useState([])
  const [mainColor,setMainColor] = useState('')
  const [gameEnd,setGameEnd] = useState(false)
  const [guess,setGuess] = useState('')
  //Colors array - gameEnd Dependency
  useEffect(()=>{
    setColors(arrayCreator())
    setGuess('')
  //This dependency allows react to re-render the whole game re-utilizing the same code
  },[gameEnd])


  //Color to guess - colors Dependency
  useEffect(()=>{
    let n = Math.floor(Math.random()*3)
    setMainColor(colors[n])
    console.log('mainColor made')
  //This dependency causes a domino effect since its rendered upon gameEnd's status
  },[colors])
 
  //Game guesser handler
  function handleChange(e) {
    let colorPick = e.target.innerText   

    return colorPick === mainColor ? setGameEnd(!gameEnd) : setGuess('incorrect');
  }


  return( 
    <div className='main'> 
        <div className='color' style={{'backgroundColor':`${mainColor}`}}></div>
        <div className='color-picker-container'>
          {colors === [] ? '' : colors.map(color => <span onClick={handleChange} key={color}>{color}</span>)}
        </div>
        <div><span className='guess'>{guess}</span></div>
    </div> 
  )
}