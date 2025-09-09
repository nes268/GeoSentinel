import { useState } from 'react';
import { Mountain } from 'lucide-react';

export default function QuarryViewer() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header - match other modules */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">3D Quarry Viewer</h1>
        <p className="text-gray-400">Explore the drone-scanned quarry model in 3D</p>
      </div>

      {/* Main panel - match card styling used elsewhere */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Quarry Risk Monitoring</h2>
              <p className="text-gray-400 text-sm">Interactive 3D visualization</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-blue-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Online</span>
          </div>
        </div>

        {/* Visualization container - consistent look */}
        <div className="relative h-[70vh] bg-gray-900/50 rounded-lg border border-cyan-500/20 p-4">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
              <div className="text-gray-300">Loading 3D model…</div>
            </div>
          )}
          <iframe
            title="quarry_scan_from_drones"
            className="w-full h-full rounded"
            allow="autoplay; fullscreen; web-share; xr-spatial-tracking; camera; gyroscope; accelerometer; magnetometer; clipboard-write"
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
            frameBorder={0}
            allowFullScreen
            src="https://sketchfab.com/models/4b216d9165af4ca1bd655993da499ab8/embed?autostart=1&ui_infos=1&ui_controls=1&ui_help=0&ui_watermark=0"
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Credit footer (compact, matching style) */}
        <div className="mt-4 text-xs text-gray-400">
          <span>
            <a
              className="text-cyan-400 hover:underline"
              href="https://sketchfab.com/3d-models/quarry-scan-from-drones-4b216d9165af4ca1bd655993da499ab8?utm_medium=embed&utm_campaign=share-popup&utm_content=4b216d9165af4ca1bd655993da499ab8"
              target="_blank"
              rel="noreferrer noopener"
            >
              quarry_scan_from_drones
            </a>{' '}by{' '}
            <a
              className="text-cyan-400 hover:underline"
              href="https://sketchfab.com/bnishanthtpm06?utm_medium=embed&utm_campaign=share-popup&utm_content=4b216d9165af4ca1bd655993da499ab8"
              target="_blank"
              rel="noreferrer noopener"
            >
              NISHANTH
            </a>{' '}on{' '}
            <a
              className="text-cyan-400 hover:underline"
              href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=4b216d9165af4ca1bd655993da499ab8"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sketchfab
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}