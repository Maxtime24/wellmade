import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Just in case there's an admin area later
        },
        sitemap: 'https://wellmade-art.co.kr/sitemap.xml',
    }
}
