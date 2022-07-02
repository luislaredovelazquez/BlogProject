const {
    Button,
    AppBar,
    Toolbar,
    Box,
    Typography,
    IconButton,
    MenuIcon,
    Fab,
    Card,
    CardActions,
    CardContent,
} = MaterialUI;



const Floating = () => {
return(<Fab aria-label="like" onClick={toggleFrame} tooltip="Hide trends frame" style={{background: '#2E3B55', color:'white', position: 'absolute', bottom: 10, right: 10,}}>
  +
</Fab>);
};

function toggleFrame(){
  window.scrollTo({
    top: 850,
    behavior: 'smooth',
  });
}

const Navbar = () => {
  return (
    <AppBar position="static" style={{ background: '#2E3B55' }}>
      <Toolbar>
      <Typography style={{fontFamily: 'Sail, cursive', fontSize: '24px'}} component="div" sx={{ flexGrow: 1 }}>
            Crime at the Sea
      </Typography>
      <Button id="home_btn" onClick={homeRedirect}  color="inherit"><Typography style={{fontFamily: 'Sail, cursive', fontSize: '24px', textTransform: 'none' }}>Home</Typography></Button>
      </Toolbar>
    </AppBar>
  );
};

const DashboardCard = () => {
return(
<Card id="def_card" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          Ship
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Noun
        </Typography>
        <Typography variant="body2">
           Large watercraft that travels the world's oceans and other sufficiently deep waterways, carrying cargo or passengers, or in support of specialized missions, such as defense, research, and fishing.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleRedirect}>Learn More</Button>
      </CardActions>
    </Card>
);
}

function handleRedirect(){
return window.location.href = 'https://en.wikipedia.org/wiki/Ship';
}

function homeRedirect(){
  return window.location.href = 'https://luislaredo.netlify.app/';
  }

function App() {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [items, setItems] = React.useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    React.useEffect(() => {
      fetch("https://api.oceandrivers.com:443/v1.0/getWebCams/")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
      
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        let urls = []; 
        let webcam_url = "";
        items.forEach(item => {
            urls.push(String(item.url));
        });           
        webcam_url = urls[2];
        if (typeof webcam_url !== 'undefined')
        {
         webcam_url = webcam_url.replace('http','https');
        }
        // https://jsfiddle.net/e5bxpuzf/2/
      return (
        <div>
            <Navbar></Navbar>
          <iframe src="map.html" height="800" width="1000" title="Maritime Attacks Map" frameBorder="0"></iframe>
          <div className="card_container">
          <div className="title_container">How close to a country shore were these attacks?</div>
          <div className="body_container">
          <b>From 1993 to 2020</b> have been more than <b>7,500 maritime pirate attacks</b> all over the world. This problem has disrupted
          the supply chain of many companies and governments who rely of the goods that ships carry to sustain critical areas
          like food, healthcare or the retail industry. In the visualizations below we can realize that <b>most of these attacks
          happen close to the shores.</b> As we can see, the chart on the left shows where the attack happen and the visualization 
          on the right describes the latitude and longitude of the closest shore to that particular event.
          </div> 
          </div>
          <iframe src="result.html" height="400" width="1000" title="Country indicators" frameBorder="0"></iframe>
          <div className="card_container">
          <div className="title_container">Which measures are taking the countries to prevent these attacks?</div>
          <div className="body_container">
          As a <b>strong response</b> to these illegal activities, governments and companies have had to take important measures to 
          prevent further attacks. In some cases, companies have had to <b>redirect their ships or navigate through different routes.</b> 
          The visualization above shows a heatmap where the most frequent attacks have happened. Also, on the right, we can 
          visualize a live webcam close to a shore to alert the authorities in case an incident is detected.  
          </div> 
          </div>    
        
        <div className="box">
        <iframe src="heatmap.html" height="480" width="480" title="Heatmap" frameBorder="0"></iframe>
        
        <div className="video_container">
        <iframe className="videoFrame" src={webcam_url} height="100%" width="100%" title="Webcam" frameBorder="0"></iframe>
        </div>
        </div>
        <br></br>
        <div className="card_container">
          <div className="title_container">Is there a correlation between the homicide rate, population and attack occurence?</div>
          <div className="body_container">
          One important fact that I found analyzing this information is that <b>most of the attacks happen close to poor countries</b>, 
          where probably their security and safety measures are not as developed as in other nations. The bar chart below shows a
          visualization with the <b>homicide rate</b> by each country and the table also shows its population. This data can work together 
          with the charts above to analyize if there is a correlation between the homicide rate of each nation and its maritime attack rate.
          </div> 
          </div>
        <iframe src="result2.html" height="900" width="1000" title="Country indicators" frameBorder="0"></iframe>
        <DashboardCard></DashboardCard>
        <Floating></Floating>
        </div>
      );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
