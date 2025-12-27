
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { MEMBERS } from '../constants';
import { Member } from '../types';
import { UserCircle, MapPin, Navigation } from 'lucide-react';

const Globe: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 600;
    const sensitivity = 75;

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`);

    const projection = d3.geoOrthographic()
      .scale(250)
      .center([0, 0])
      .rotate([rotationRef.current, -20])
      .translate([width / 2, height / 2]);

    const initialScale = projection.scale();
    const path = d3.geoPath().projection(projection);

    // Fetch world data
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((data: any) => {
      const countries = feature(data, data.objects.countries);

      const render = () => {
        svg.selectAll('*').remove();

        // Background circle (Ocean)
        svg.append('circle')
          .attr('cx', width / 2)
          .attr('cy', height / 2)
          .attr('r', projection.scale())
          .attr('fill', '#050505')
          .attr('stroke', '#1a1a1a')
          .attr('stroke-width', 0.5);

        // Graticule (Grid lines)
        const graticule = d3.geoGraticule();
        svg.append('path')
          .datum(graticule())
          .attr('class', 'graticule')
          .attr('d', path as any)
          .attr('fill', 'none')
          .attr('stroke', '#ff0000')
          .attr('stroke-opacity', 0.05);

        // Land
        svg.append('g')
          .selectAll('path')
          .data((countries as any).features)
          .enter()
          .append('path')
          .attr('d', path as any)
          .attr('fill', '#1a1a1a')
          .attr('stroke', '#333')
          .attr('stroke-width', 0.5);

        // Member Markers
        const markers = svg.append('g');
        
        MEMBERS.forEach(member => {
          const coords = [member.location.lng, member.location.lat] as [number, number];
          const point = projection(coords);
          
          if (point) {
            // Check if point is on the visible hemisphere
            const isVisible = d3.geoDistance(coords, projection.invert!([width / 2, height / 2]) as [number, number]) < Math.PI / 2;
            
            if (isVisible) {
              const markerGroup = markers.append('g')
                .attr('class', 'cursor-pointer transition-transform hover:scale-125')
                .on('mouseenter', () => setSelectedMember(member))
                .on('click', () => setSelectedMember(member));

              // Outer glow pulse
              markerGroup.append('circle')
                .attr('cx', point[0])
                .attr('cy', point[1])
                .attr('r', 8)
                .attr('fill', '#ef4444')
                .attr('fill-opacity', 0.3)
                .attr('class', 'marker-pulse');

              // Inner solid dot
              markerGroup.append('circle')
                .attr('cx', point[0])
                .attr('cy', point[1])
                .attr('r', 3)
                .attr('fill', '#ef4444')
                .attr('stroke', '#fff')
                .attr('stroke-width', 1);
            }
          }
        });
      };

      // Auto rotation
      let timer = d3.timer(() => {
        if (!selectedMember) {
          rotationRef.current += 0.2;
          projection.rotate([rotationRef.current, -20]);
          render();
        }
      });

      return () => timer.stop();
    });
  }, [selectedMember]);

  return (
    <div className="min-h-[calc(100vh-64px)] racing-gradient relative flex flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-oswald font-bold uppercase italic tracking-tighter text-white mb-2">
          Global <span className="text-red-600">Grid</span>
        </h1>
        <p className="text-gray-400 font-light max-w-md mx-auto">
          Tracking the speed of CNA Racing members across the globe. Hover a marker for driver intel.
        </p>
      </div>

      <div className="w-full max-w-4xl aspect-square flex items-center justify-center relative">
        <svg ref={svgRef} className="w-full h-full drop-shadow-[0_0_50px_rgba(239,68,68,0.1)]" />
        
        {/* Detail Panel */}
        <div className={`absolute bottom-8 right-8 left-8 md:left-auto md:w-80 transition-all duration-500 transform ${selectedMember ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
          {selectedMember && (
            <div className="bg-black/80 backdrop-blur-xl border border-red-600/50 rounded-2xl p-6 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <Navigation size={64} className="text-red-600" />
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-red-600 shadow-lg">
                  <UserCircle size={40} className="text-gray-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-oswald text-white uppercase italic">{selectedMember.name}</h3>
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
                <span className="text-sm font-medium text-white italic">{selectedMember.favCar}</span>
              </div>

              <button 
                onClick={() => setSelectedMember(null)}
                className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-gray-400 text-xs uppercase font-bold rounded-lg transition-colors"
              >
                Release Focus
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-12 left-12 hidden lg:block">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-600 marker-pulse"></div>
            <span className="text-xs uppercase font-bold text-gray-400 tracking-tighter">Active Drivers: {MEMBERS.length}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-xs uppercase font-bold text-gray-400 tracking-tighter">Continents: 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Globe;
