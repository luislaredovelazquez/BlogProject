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
        const urls = []; 
        items.forEach(item => {
            urls.push(item.url);
        });   
      return (
        <div>
            <Navbar></Navbar>
            <iframe src="map.html" height="800" width="1500" title="Maritime Attacks Map"></iframe>
            <iframe
                id="trends-widget"
                src="https://trends.google.com:443/trends/embed/explore/TIMESERIES?req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22Maritime+piracy%22%2C%22geo%22%3A%22US%22%2C%22time%22%3A%22today%2012-m%22%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&amp;tz=-480&amp;"
                width="100%"
                height="500px"
                frameBorder="0"
                scrolling="0"
            /> 
         <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Live webcam
        </Typography>      
        <iframe src={urls[2]} height="200" width="300" title="Webcam"></iframe>
        <DashboardCard></DashboardCard>
        <iframe src="ships.html" height="400" width="1500" title="Ships tracker"></iframe>
        <Floating></Floating>
        </div>
      );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
