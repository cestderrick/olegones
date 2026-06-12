'use client';
import { useState, useEffect } from 'react';
import { fetchContent, fetchEvents, fetchDocuments, fetchReferences, fetchInstagram, fetchTestimonials, fetchPosts } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Agenda from '@/components/sections/Agenda';
import Methodologie from '@/components/sections/Methodologie';
import Documents from '@/components/sections/Documents';
import References from '@/components/sections/References';
import Actualites from '@/components/sections/Actualites';
import Testimonials from '@/components/sections/Testimonials';
import Carte from '@/components/sections/Carte';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import CookieBanner from '@/components/CookieBanner';

export default function Home() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [events, setEvents] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [references, setReferences] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [posts, setPosts] = useState([]);
  const [igPosts, setIgPosts] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchContent(),
      fetchEvents(),
      fetchDocuments(),
      fetchReferences(),
      fetchTestimonials(),
      fetchPosts(),
      fetchInstagram(),
    ]).then(([c, ev, docs, refs, test, p, ig]) => {
      if (Object.keys(c).length) setContent(c);
      setEvents(ev);
      setDocuments(docs);
      setReferences(refs);
      setTestimonials(test);
      setPosts(p);
      setIgPosts(ig);
    });
  }, []);

  const mapProps = {
    venueName: content['map.venue_name'] || 'Bieristan',
    venueAddress: content['map.venue_address'] || 'Villeurbanne, France',
    lat: parseFloat(content['map.venue_lat'] || '45.7669'),
    lng: parseFloat(content['map.venue_lng'] || '4.8862'),
    radius: parseInt(content['map.zone_radius'] || '15000'),
  };

  return (
    <>
      <Navbar content={content} />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Actualites posts={posts} />
        <Agenda content={content} events={events} />
        <Methodologie content={content} />
        <Documents content={content} documents={documents} />
        <References content={content} references={references} />
        <Testimonials testimonials={testimonials} />
        {igPosts.length > 0 && <InstagramFeed content={content} posts={igPosts} />}
        <Contact content={content} />
        <Carte {...mapProps} />
      </main>
      <Footer content={content} />
      <ScrollReveal />
      <CookieBanner />
    </>
  );
}
