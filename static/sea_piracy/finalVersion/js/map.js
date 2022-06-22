$('document').ready(function(){
    var width = 1000;
    var height = 800;
  
    var svg = d3.select("#map")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    var projection = d3.geo.mercator()
      .center([0,40])
      .scale(160)
      .rotate([0, 0, 0])
      .translate([width / 2, height / 2]);
  
    var g = svg.append('g');
  
    var path = d3.geo.path()
      .projection(projection);
  
  
    d3.json("https://raw.githubusercontent.com/mtaz/fcc-d3-json/master/world-110m2.json", function(error, mapData){
      if(error){
        console.log("Error with Data");
      } 
      
      g.selectAll('path')
        .data(topojson.feature(mapData, mapData.objects.countries).features)
        .enter()
        .append('path')
        .attr("d", path);
  
    var zoom = d3.behavior.zoom()
        .scaleExtent([1,8])
        .on("zoom", function(){
          g.attr("transform", "translate("+ 
              d3.event.translate.join(",")+")scale("+d3.event.scale+")");
          g.selectAll("path")
              .attr("d", path.projection(projection));
        })
    svg.call(zoom);
  
    d3.csv("data/pirate_attacks.csv", function(error, data){
        if(error){
          console.log('Error with vessel data.')
        }
        
          
          
     /*   var data = data.features.filter(function(d){
          if(d.geometry){
            return true;
          }
        })  */
          
        
       
        var year = function (d) {
          if(!d.date){
            return 0;
          }
          return d.date.slice(0,4); 
        }  
        
    
        var data = data.sort(function(a,b){
          if (Number(year(a)) < Number(year(b))){
            return -1;
          } else if (Number(year(a)) > Number(year(b))) {
            return 1;
          } 
          return 0;
        });  
         
  
      
        var points = data.length;
        lgdWidth = 500;
        lgdHeight = 50;
      
        var tooltip = d3.select('body')
            .append('div')
            .attr("class", "tooltip")
            .style("opacity", 0);
        
      
        var timeScale = d3.scale.linear()
             .domain([0-2016])
             .range([0-600]);

        var yeardash = d3.select('body').append('div')
             .attr("class", "aty")
             .attr("id","atydas")
             .style("opacity", 1)
             .text("");     
      
      
        var circles = g.selectAll("circle")
            .data(data)    
            .enter()
            .append("circle")
            .attr("cx", function(d){
              //console.log(d);
              return projection([d.longitude, d.latitude])[0];
            })
            .attr("cy", function(d){
              return projection([d.longitude, d.latitude])[1];
            })
            .attr("r", 5)
            .style("fill", "red")
            .style("stroke-width", ".2px")
            .style("stroke", "steelblue")
            .style("opacity", 0)
            .on("mouseover", function(d) {
              tooltip.transition()
                      .duration(200)
                      .style("opacity", .95);
              
              tooltip.html("<strong>" + d.vessel_name + "</strong><br>" + year(d) + "<br>Vessel type: " + d.vessel_type)
                      .style("top", (d3.event.pageY-20) + "px")
                      .style("left", (d3.event.pageX+20) + "px");
              
            })
            .on("mouseout", function(d){
              tooltip.transition()
                      .duration(700)
                      .style("opacity", 0);
            });
      
      //button to start meteor placement by time
        var timeline = $(".timeline").on("click", function(){
                   
          circles.style("opacity", 0)
                  .transition()
                  .duration(500)
                  .delay(function(d,i){ 
                    return i * 20; })
                  .each(fall);         
                       
        
        // called for each circle to move it into place  
        function fall(){
          var circle = d3.select(this);
          circle.transition()
                .style("opacity", .85)
                .attr("cx", function(d){
                  return projection([d.longitude, d.latitude])[0];
                 })
               .attr("cy", function(d){
                  return projection([d.longitude, d.latitude])[1];
                 })
                .transition()
                .attr("cx", function(d){
                   return projection([d.longitude, d.latitude])[0];
                  })
                .attr("cy", function(d){
                   return projection([d.longitude, d.latitude])[1];
                  })
                .style("fill", "blue");  
                
                }

          document.getElementById("atydas").innerText = 1993;
          
          const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
          }
          
          const showTimeline = async () => {
            for (let i = 0; i<27; i++) {
             await sleep(5000)
             document.getElementById("atydas").innerText = 1993 + i;
              }
            } 
            
            showTimeline();

        
        });
              
          
        })
        
  
      })
  
  
    })
  
  
    
    
    
  
  
  