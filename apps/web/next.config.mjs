import { withContentlayer } from 'next-contentlayer'

export default withContentlayer({
  images: {
    remotePatterns: [{
      protocol: 'https', hostname: 'img.clerk.com', port: '', pathname: '/**',
    }],
  },
})