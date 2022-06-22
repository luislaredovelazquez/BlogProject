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
return(<Fab aria-label="like" color='primary' onClick={toggleFrame} tooltip="Hide trends frame" style={{position: 'absolute', bottom: 10, right: 10,}}>
  +
</Fab>);
};

function toggleFrame(){
if(document.getElementById('def_card').style.opacity == 1){
document.getElementById('def_card').style.opacity = 0;}
else{
document.getElementById('def_card').style.opacity = 1;}
}

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
      <Button color="inherit">Maritime Trends</Button>
      </Toolbar>
    </AppBar>
  );
};

const DashboardCard = () => {
return(
<Card id="def_card" sx={{ minWidth: 275 }}  style={{opacity:0}}>
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
          <iframe src="result.html" height="400" width="1000" title="Country indicators" frameBorder="0"></iframe>
         <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Live webcam
        </Typography>      
        
        <div className="box">
        <iframe src="heatmap.html" height="480" width="480" title="Heatmap" frameBorder="0"></iframe>
        
        <div className="video_container">
        <iframe className="videoFrame" src={webcam_url} height="100%" width="100%" title="Webcam" frameBorder="0"></iframe>
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
