import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { HouseIcon } from "./icons";
import { useState } from 'react';
import { MarkerImageGalery } from "./MarkerImageGalery"


interface customMarkerProps {
    position: { lat: number, lng: number }
}



export function CustomMarker(props : customMarkerProps) {

    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    let size = 20;
    



    const pinContent =()=>{
        if(hovered){
            return(<span className='flex group-hover:w-11 group-hover:h-11 rounded-full justify-center items-center transition-all justify-items-center'><MarkerImageGalery clicked={clicked}></MarkerImageGalery></span>);
        }else{
            return(<span className='flex bg-amber-600 w-8 h-8 group-hover:w-11 group-hover:h-11 rounded-full justify-center items-center transition-all'><HouseIcon size={size}/></span>);
        }
       
    }

    const customPin = () => {
        
        return (
            <>
                <div className='flex group justify-center  bg-white pointer-events-none items origin-bottom'>
                <div className='mask-clip-content
 w-10 h-10 hover:w-14 hover:h-14 origin-center z-10 justify-center items-center flex bg-slate-800 rounded-[50%] transition-all pointer-events-auto self-end mb-1 '>
                    {pinContent()}
                </div>
                <div className='flex fixed z-0 w-5 h-5 bg-slate-600 self-end rotate-45  rounded-md'/>
                </div>
            </>
        );
    };

    return (
        <div>
            <AdvancedMarker
            position={props.position}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setClicked(!clicked)}
            >
            {customPin()}
            </AdvancedMarker>
        </div>
    );

}