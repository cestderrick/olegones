import { fetchContent, fetchEvents, fetchDocuments, fetchReferences, fetchInstagram, fetchTestimonials } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Agenda from '@/components/sections/Agenda';
import Methodologie from '@/components/sections/Methodologie';
import Documents from '@/components/sections/Documents';
import References from '@/components/sections/References';
import Testimonials from '@/components/sections/Testimonials';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import CookieBanner from '@/components/CookieBanner';

export const revalidate = 60;

export default async function Home() {
  const [content, events, documents, references, testimonials, igPosts] = await Promise.all([
    fetchContent(),
    fetchEvents(),
    fetchDocuments(),
    fetchReferences(),
    fetchTestimonials(),
    fetchInstagram(),
  ]);

  return (
    <>
      <Navbar content={content} />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Agenda content={content} events={events} />
        <Methodologie content={content} />
        <Documents content={content} documents={documents} />
        <References content={content} references={references} />
        <Testimonials testimonials={testimonials} />
        {igPosts.length > 0 && <InstagramFeed content={content} posts={igPosts} />}
        <Contact content={content} />
      </main>
      <Footer content={content} />
      <ScrollReveal />
      <CookieBanner />
    </>
  );
}
