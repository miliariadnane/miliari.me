import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">Theme by timlrx</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <a href="https://vercel.com/">
              <span>Deployed on Vercel</span>
            </a>
            <div>{` • `}</div>
            <a href="https://github.com/miliariadnane/miliari.me">
              <span>Open source on Github</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}