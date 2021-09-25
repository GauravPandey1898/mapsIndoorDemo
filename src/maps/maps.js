import React,{useState, useEffect, useRef} from "react"
import "./maps.css"
function Maps(){
    const mapRef = useRef()
    let [showTooltipDiv, setShowTooltipDiv] = useState(false)
    let [currentSelect, setCurrentSelect] = useState([])
    let [tempTooltipStyle, setTempTooltipStyle] = useState([])
    let [tooltipStyle, setTooltipStyle] = useState([])
    let [clickEventTrigger, setClickEventTrigger] = useState(false)
    const initializeMap = () => {
         // Setup Google map
         const mapViewOptions = {
            element: mapRef.current,
            center: { lat: 38.8974905, lng: -77.0362723 }, // The White House
            zoom: 17,
            maxZoom: 22,
          };
          const mapViewInstance = new window.mapsindoors.mapView.GoogleMapsView(mapViewOptions);
          const mapsIndoorsInstance = new window.mapsindoors.MapsIndoors({ mapView: mapViewInstance });
          const googleMapsInstance = mapViewInstance.getMap();
          
          // Floor Selector
          const floorSelectorElement = document.createElement('div');
          new window.mapsindoors.FloorSelector(floorSelectorElement, mapsIndoorsInstance);
          googleMapsInstance.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(floorSelectorElement);
          const mapsIndoors = new window.mapsindoors.MapsIndoors({
            mapView: mapViewInstance,
        });
        mapsIndoors.addListener('click', (e) => {
            console.log(`MapsIndoors: Ready`,  e);
            setShowTooltipDiv(true)
            
            setClickEventTrigger(true)
            if(e.properties.description){
                setCurrentSelect(e.properties.description)
            }
            else{
                setCurrentSelect(e.properties.name)
            }
           });
           googleMapsInstance.addListener('zoom_changed',(e) => {
            setShowTooltipDiv(false)
           }) 
    }

    const showTooltip = (e) => {
        setTempTooltipStyle(e) 
    }

    useEffect(()=>{
        initializeMap()
    },[])

    useEffect(()=>{
        if(currentSelect && clickEventTrigger){
            setTooltipStyle(tempTooltipStyle)
            setClickEventTrigger(false)
        }else{
            setShowTooltipDiv(false) 
        }
    },[ tempTooltipStyle])

    

    return(
        <>
            <div className="maps" ref={mapRef} onClick={e => showTooltip(e)}></div>
            
            <div className={showTooltipDiv? "tooltip fadeIn" : "tooltip fadeOut"} style={{top: tooltipStyle.clientY, left: tooltipStyle.clientX}}>
                {currentSelect}
            </div>
            
        </>
    )
}

export default Maps