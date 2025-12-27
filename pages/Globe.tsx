
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { MEMBERS } from '../constants';
import { Member } from '../types';
import { UserCircle, MapPin, Navigation, MousePointer2 } from 'lucide-react';

const Globe: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const rotationRef = useRef<[number, number]>([0, -20]);
  const isAutoRotatingRef = useRef(true);

  // Use refs to hold D3 selections for high-performance updates
  const pathRef = useRef<any>(null);
  const projectionRef = useRef<any>(null);
  const globeElementsRef = useRef<{
    land: any;
    grid: any;
    markers: any;
    ocean: any;
  } | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 600;
    const sensitivity = 75;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .on('click', () => {
        isAutoRotatingRef.current = false;
      });

    const projection = d3.geoOrthographic()
      .scale(250)
      .center([0, 0])
      .rotate(rotationRef.current)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);
    
    projectionRef.current = projection;
    pathRef.current = path;

    // Initial setup of persistent elements
    const ocean = svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', projection.scale())
      .attr('fill', '#050505')
      .attr('stroke', '#1a1a1a')
      .attr('stroke-width', 0.5);

    const grid = svg.append('path')
      .attr('fill', 'none')
      .attr('stroke', '#ff0000')
      .attr('stroke-opacity', 0.05);

    const landGroup = svg.append('g');
    const markerGroup = svg.append('g');

    globeElementsRef.current = {
      land: landGroup,
      grid: grid,
      markers: markerGroup,
      ocean: ocean
    };

    // Load Data and Draw
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((data: any) => {
      const countries = feature(data, data.objects.countries);
      const graticule = d3.geoGraticule();

      grid.datum(graticule());

      landGroup.selectAll('path')
        .data((countries as any).features)
        .enter()
        .append('path')
        .attr('fill', '#1a1a1a')
        .attr('stroke', '#333')
        .attr('stroke-width', 0.5);

      // Create marker groups once
      const markers = markerGroup.selectAll('.marker')
        .data(MEMBERS)
        .enter()
        .append('g')
        .attr('class', 'marker cursor-pointer')
        .on('mouseenter', (event, d) => setSelectedMember(d))
        .on('click', (event, d) => {
          event.stopPropagation();
          setSelectedMember(d);
          isAutoRotatingRef.current = false;
        });

      markers.append('circle')
        .attr('class', 'marker-glow marker-pulse')
        .attr('r', 8)
        .attr('fill', '#ef4444')
        .attr('fill-opacity', 0.2);

      markers.append('circle')
        .attr('class', 'marker-dot')
        .attr('r', 3)
        .attr('fill', '#ef4444')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);

      const updatePositions = () => {
        const p = projectionRef.current;
        const pathGenerator = pathRef.current;
        const center = p.invert!([width / 2, height / 2]) as [number, number];

        // Update main paths
        grid.attr('d', pathGenerator);
        landGroup.selectAll('path').attr('d', pathGenerator);

        // Update markers
        markerGroup.selectAll('.marker').each(function(d: any) {
          const coords = [d.location.lng, d.location.lat] as [number, number];
          const point = p(coords);
          const isVisible = d3.geoDistance(coords, center) < Math.PI / 2;
          
          d3.select(this)
            .attr('transform', point ? `translate(${point[0]}, ${point[1]})` : null)
            .attr('opacity', isVisible ? 1 : 0)
            .style('pointer-events', isVisible ? 'auto' : 'none');
        });
      };

      // Drag behavior
      const drag = d3.drag<SVGSVGElement, unknown>()
        .on('start', () => {
          isAutoRotatingRef.current = false;
        })
        .on('drag', (event) => {
          // Fix: Define 'p' from projectionRef.current to resolve "Cannot find name 'p'" errors in the drag handler
          const p = projectionRef.current;
          if (!p) return;
          const rotate = p.rotate();
          const k = sensitivity / p.scale();
          p.rotate([
            rotate[0] + event.dx * k,
            rotate[1] - event.dy * k
          ]);
          rotationRef.current = p.rotate() as [number, number];
          updatePositions();
        });

      svg.call(drag as any);

      // Smooth Animation Timer
      const timer = d3.timer(() => {
        if (isAutoRotatingRef.current) {
          rotationRef.current[0] += 0.15; // Slower, smoother rotation
          projectionRef.current.rotate(rotationRef.current);
          updatePositions();
        }
      });

      updatePositions();

      return () => {
        timer.stop();
      };
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-[calc(100vh-64px)] racing-gradient relative flex flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-oswald font-bold uppercase italic tracking-tighter text-white mb-2">
          Global <span className="text-red-600">Grid</span>
        </h1>
        <p className="text-gray-400 font-light max-w-md mx-auto px-4">
          Tracking the speed of CNA Racing members across the globe.
        </p>
      </div>

      <div className="w-full max-w-4xl aspect-square flex items-center justify-center relative cursor-grab active:cursor-grabbing">
        <svg 
          ref={svgRef} 
          className="w-full h-full drop-shadow-[0_0_50px_rgba(239,68,68,0.1)]"
        />
        
        {/* Interaction Prompt */}
        {isAutoRotatingRef.current && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-red-500/50 animate-pulse pointer-events-none">
            <MousePointer2 size={12} /> Drag to explore
          </div>
        )}

        {/* Detail Panel */}
        <div className={`absolute bottom-8 right-8 left-8 md:left-auto md:w-80 transition-all duration-500 transform ${selectedMember ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
          {selectedMember && (
            <div className="bg-black/90 backdrop-blur-xl border border-red-600/50 rounded-2xl p-6 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <Navigation size={64} className="text-red-600" />
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-red-600 shadow-lg shrink-0">
                  <UserCircle size={40} className="text-gray-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold font-oswald text-white uppercase italic truncate">{selectedMember.name}</h3>
                  <p className="text-red-500 text-xs font-bold flex items-center gap-1 uppercase">
                    <MapPin size={12} /> {selectedMember.location.city}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-neutral-900/50 p-3 rounded-xl border border-white/5">
                  <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-widest">iRating</span>
                  <span className="text-lg font-bold text-blue-400">{selectedMember.iRating}</span>
                </div>
                <div className="bg-neutral-900/50 p-3 rounded-xl border border-white/5">
                  <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-widest">Safety</span>
                  <span className="text-lg font-bold text-green-400">{selectedMember.safetyRating}</span>
                </div>
              </div>

              <div className="bg-red-600/10 p-4 rounded-xl border border-red-600/20 mb-4">
                <span className="block text-[10px] text-red-500 uppercase font-bold tracking-widest mb-1">Primary Weapon</span>
                <span className="text-sm font-medium text-white italic truncate block">{selectedMember.favCar}</span>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMember(null);
                }}
                className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-gray-400 text-xs uppercase font-bold rounded-lg transition-colors"
              >
                Close Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Control Overlay */}
      <div className="absolute bottom-12 left-12 hidden lg:flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-600 marker-pulse"></div>
          <span className="text-xs uppercase font-bold text-gray-400 tracking-tighter">Live Database Connection</span>
        </div>
        <button 
          onClick={() => {
            isAutoRotatingRef.current = !isAutoRotatingRef.current;
            if (isAutoRotatingRef.current) setSelectedMember(null);
          }}
          className="flex items-center gap-3 group bg-black/40 hover:bg-black/60 px-4 py-2 rounded-full border border-white/5 transition-all"
        >
          <div className={`w-2 h-2 rounded-full transition-colors ${isAutoRotatingRef.current ? 'bg-green-500 animate-pulse' : 'bg-neutral-600 group-hover:bg-green-500'}`}></div>
          <span className="text-xs uppercase font-bold text-gray-200 tracking-tighter">
            Auto-Rotation: {isAutoRotatingRef.current ? 'ACTIVE' : 'PAUSED'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Globe;
