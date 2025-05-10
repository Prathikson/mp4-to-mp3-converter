// In your main page (probably in `page.tsx`):
export default function DonateShare() {
    return (
      <section className="px-6 py-20">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Love our service? Help us grow!
        </h2>
        <div className="space-x-6">
          <a
            href="https://www.paypal.com/donate?hosted_button_id=YOUR_PAYPAL_LINK"
            target="_blank"
            className="px-6 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-opacity-90 transition-all duration-300"
          >
            Donate
          </a>
          <a
            href="https://twitter.com/share?url=YOUR_URL&text=Check%20out%20this%20great%20MP4%20to%20MP3%20converter!"
            target="_blank"
            className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-400 transition-all duration-300"
          >
            Share on Twitter
          </a>
        </div>
      </section>
    );
  }
  