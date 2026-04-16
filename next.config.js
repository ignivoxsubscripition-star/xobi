/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // Fix case sensitivity issues on Windows
      config.resolve.symlinks = false
      
      // Suppress verbose webpack cache warnings
      config.infrastructureLogging = {
        level: 'error',
      }
      
      // Suppress webpack cache warnings in stats
      config.stats = {
        ...config.stats,
        warnings: false,
        warningsFilter: [
          /webpack\.cache\.PackFileCacheStrategy/,
          /Resolving dependencies are ignored for this path/,
          /case sensitive/i,
          /multiple modules with names that only differ in casing/i,
        ],
      }
    }
    
    return config
  },
}

module.exports = nextConfig
