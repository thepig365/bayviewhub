'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Wine, Clock, MapPin, Phone, Mail, Users, Award, Grape, Calendar } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

// Mock Wine List Data
const wineList = {
  sparklingAndRose: [
    {
      name: 'Bayview Estate Sparkling Blanc de Blanc',
      vintage: '2021',
      price: '$45',
      notes: 'Crisp citrus with delicate bubbles, hints of green apple and brioche.',
      variety: 'Chardonnay',
    },
    {
      name: 'Bayview Rosé',
      vintage: '2023',
      price: '$35',
      notes: 'Fresh strawberries and watermelon, dry finish with subtle minerality.',
      variety: 'Pinot Noir',
    },
  ],
  whites: [
    {
      name: 'Bayview Estate Chardonnay',
      vintage: '2022',
      price: '$42',
      notes: 'Stone fruit, creamy oak, balanced acidity with a long, elegant finish.',
      variety: 'Chardonnay',
    },
    {
      name: 'Bayview Peninsula Pinot Gris',
      vintage: '2023',
      price: '$38',
      notes: 'Pear and honeysuckle, refreshing citrus with a clean, crisp palate.',
      variety: 'Pinot Gris',
    },
    {
      name: 'Bayview Sauvignon Blanc',
      vintage: '2023',
      price: '$36',
      notes: 'Tropical fruit, passionfruit and lime zest, vibrant and zesty.',
      variety: 'Sauvignon Blanc',
    },
  ],
  reds: [
    {
      name: 'Bayview Estate Pinot Noir',
      vintage: '2021',
      price: '$55',
      notes: 'Cherry and plum, earthy undertones, silky tannins with spiced oak.',
      variety: 'Pinot Noir',
    },
    {
      name: 'Bayview Reserve Pinot Noir',
      vintage: '2020',
      price: '$75',
      notes: 'Complex layers of dark berries, forest floor, and fine tannins. Our flagship wine.',
      variety: 'Pinot Noir',
    },
    {
      name: 'Bayview Shiraz',
      vintage: '2021',
      price: '$48',
      notes: 'Blackberry and pepper, medium body with soft tannins and subtle spice.',
      variety: 'Shiraz',
    },
    {
      name: 'Bayview Tempranillo',
      vintage: '2022',
      price: '$44',
      notes: 'Red cherry, leather and tobacco, smooth finish with gentle oak.',
      variety: 'Tempranillo',
    },
  ],
  dessert: [
    {
      name: 'Bayview Late Harvest Riesling',
      vintage: '2022',
      price: '$38 (375ml)',
      notes: 'Honeyed apricot, citrus marmalade, luscious sweetness balanced by acidity.',
      variety: 'Riesling',
    },
  ],
}

const tastingExperiences = [
  {
    title: 'Classic Tasting',
    price: '$20 per person',
    duration: '30-45 minutes',
    description: 'Sample 5 wines from our current release range, guided by our knowledgeable staff.',
    wines: '5 wines',
    icon: Wine,
  },
  {
    title: 'Premium Tasting',
    price: '$35 per person',
    duration: '45-60 minutes',
    description: 'Explore 6 premium wines including our Reserve Pinot Noir and aged vintages.',
    wines: '6 wines',
    icon: Award,
  },
  {
    title: 'Vineyard Experience',
    price: '$75 per person',
    duration: '90 minutes',
    description: 'Private tasting, vineyard tour, cheese platter, and meet the winemaker.',
    wines: '8 wines + tour',
    icon: Grape,
  },
]

export default function CellarDoorPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sparklingAndRose' | 'whites' | 'reds' | 'dessert'>('all')

  const getAllWines = () => {
    if (selectedCategory === 'all') {
      return [
        ...wineList.sparklingAndRose,
        ...wineList.whites,
        ...wineList.reds,
        ...wineList.dessert,
      ]
    }
    return wineList[selectedCategory]
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/images/cellar.jpg')" }}>
      </section>

      {/* Opening Hours & Contact Bar */}
      <section className="bg-primary-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-center md:text-left">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm md:text-base">Open Daily</p>
                <p className="text-xs md:text-sm text-white/80">11:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0" />
              <div>
                <p className="font-semibold text-xs md:text-base">{SITE_CONFIG.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0" />
              <div>
                <Link href={`tel:${SITE_CONFIG.phone}`} className="hover:text-accent transition-colors text-sm md:text-base font-semibold">
                  {SITE_CONFIG.phone}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Cellar Door */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
                Welcome to Bayview Estate Cellar Door
              </h2>
              <p className="text-lg text-natural-700 mb-4 leading-relaxed">
                Nestled in the heart of Main Ridge, our cellar door offers an intimate and authentic wine tasting experience on the Mornington Peninsula.
              </p>
              <p className="text-lg text-natural-700 mb-4 leading-relaxed">
                Our vineyard spans 30 acres of rolling hills, where cool climate and coastal breezes create the perfect conditions for growing exceptional Pinot Noir, Chardonnay, and other premium varietals.
              </p>
              <p className="text-lg text-natural-700 mb-6 leading-relaxed">
                Whether you're a wine enthusiast or just beginning your wine journey, our passionate team will guide you through our range, sharing stories of the land, the vines, and the craft behind every bottle.
              </p>
              <Button href="#book" variant="primary" size="lg">
                Book Your Tasting
              </Button>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/cellar.jpg"
                alt="Bayview Estate Cellar Door"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tasting Experiences */}
      <section className="py-20 bg-primary-400/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
              Tasting Experiences
            </h2>
            <p className="text-lg md:text-xl text-natural-700">
              Choose the perfect tasting experience for your visit
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {tastingExperiences.map((experience, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <experience.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-serif font-bold text-primary-800 mb-2">
                  {experience.title}
                </h3>
                <p className="text-3xl font-bold text-accent mb-2">{experience.price}</p>
                <p className="text-sm text-natural-600 mb-4 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {experience.duration}
                </p>
                <p className="text-natural-700 mb-4 leading-relaxed">
                  {experience.description}
                </p>
                <div className="bg-primary-400/20 rounded-lg p-3 mb-6">
                  <p className="text-sm font-semibold text-primary-800">Includes: {experience.wines}</p>
                </div>
                <Button href="#book" variant="primary" className="w-full">
                  Book This Experience
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wine List */}
      <section id="wine-list" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
                Our Wine Collection
              </h2>
              <p className="text-lg md:text-xl text-natural-700 mb-8">
                Handcrafted wines that capture the essence of the Mornington Peninsula
              </p>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-natural-100 text-natural-700 hover:bg-natural-200'
                  }`}
                >
                  All Wines
                </button>
                <button
                  onClick={() => setSelectedCategory('sparklingAndRose')}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                    selectedCategory === 'sparklingAndRose'
                      ? 'bg-primary text-white'
                      : 'bg-natural-100 text-natural-700 hover:bg-natural-200'
                  }`}
                >
                  Sparkling & Rosé
                </button>
                <button
                  onClick={() => setSelectedCategory('whites')}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                    selectedCategory === 'whites'
                      ? 'bg-primary text-white'
                      : 'bg-natural-100 text-natural-700 hover:bg-natural-200'
                  }`}
                >
                  White Wines
                </button>
                <button
                  onClick={() => setSelectedCategory('reds')}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                    selectedCategory === 'reds'
                      ? 'bg-primary text-white'
                      : 'bg-natural-100 text-natural-700 hover:bg-natural-200'
                  }`}
                >
                  Red Wines
                </button>
                <button
                  onClick={() => setSelectedCategory('dessert')}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                    selectedCategory === 'dessert'
                      ? 'bg-primary text-white'
                      : 'bg-natural-100 text-natural-700 hover:bg-natural-200'
                  }`}
                >
                  Dessert Wines
                </button>
              </div>
            </div>

            {/* Wine Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getAllWines().map((wine, index) => (
                <div key={index} className="bg-primary-400/10 rounded-xl p-6 border border-primary-400 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-bold text-primary-800 mb-1">
                        {wine.name}
                      </h3>
                      <p className="text-sm text-natural-600 mb-2">
                        {wine.variety} • {wine.vintage}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">{wine.price}</p>
                    </div>
                  </div>
                  <p className="text-natural-700 italic leading-relaxed">
                    "{wine.notes}"
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Wine Club Section */}
      <section className="py-20 bg-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Wine className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-accent" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
                Join Our Wine Club
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                Become part of the Bayview Estate family and enjoy exclusive access to our finest wines, special events, and member-only experiences.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-accent rounded-full p-3 mr-4">
                    <Wine className="w-6 h-6 text-primary-800" />
                  </div>
                  <h3 className="text-xl font-bold">20% Off All Wines</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Enjoy 20% discount on all wine purchases at our cellar door and online store year-round.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-accent rounded-full p-3 mr-4">
                    <Award className="w-6 h-6 text-primary-800" />
                  </div>
                  <h3 className="text-xl font-bold">Exclusive Releases</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  First access to limited release wines and special vintages before they're available to the public.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-accent rounded-full p-3 mr-4">
                    <Users className="w-6 h-6 text-primary-800" />
                  </div>
                  <h3 className="text-xl font-bold">Member Events</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Invitations to exclusive member events, wine dinners, and winemaker sessions throughout the year.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-accent rounded-full p-3 mr-4">
                    <Grape className="w-6 h-6 text-primary-800" />
                  </div>
                  <h3 className="text-xl font-bold">Vineyard Tours</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Complimentary vineyard tours for you and your guests, with behind-the-scenes access.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-accent rounded-full p-3 mr-4">
                    <Mail className="w-6 h-6 text-primary-800" />
                  </div>
                  <h3 className="text-xl font-bold">Quarterly Shipments</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Curated wine selections delivered to your door four times a year, with tasting notes from our winemaker.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-accent rounded-full p-3 mr-4">
                    <Calendar className="w-6 h-6 text-primary-800" />
                  </div>
                  <h3 className="text-xl font-bold">Priority Bookings</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Skip the wait with priority bookings for premium tastings and special dining experiences.
                </p>
              </div>
            </div>

            {/* Membership Tiers */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 text-primary-800">
                <h3 className="text-2xl font-serif font-bold mb-2 text-primary-800">Classic Membership</h3>
                <p className="text-4xl font-bold text-primary-800 mb-4">$150 <span className="text-lg font-normal text-natural-600">/year</span></p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-accent-600 mr-2 font-bold">✓</span>
                    <span>20% discount on all wines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-600 mr-2 font-bold">✓</span>
                    <span>4 quarterly wine shipments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-600 mr-2 font-bold">✓</span>
                    <span>Member-only event invitations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-600 mr-2 font-bold">✓</span>
                    <span>Complimentary cellar door tastings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-600 mr-2 font-bold">✓</span>
                    <span>Birthday wine gift</span>
                  </li>
                </ul>
                <Button 
                  href={`mailto:${SITE_CONFIG.email}?subject=Wine Club Classic Membership Enquiry&body=Hi, I'd like to join the Classic Wine Club membership.%0D%0A%0D%0AName:%0D%0APhone:%0D%0AAddress:%0D%0A%0D%0AThank you!`}
                  variant="primary" 
                  className="w-full"
                  external
                >
                  Join Classic
                </Button>
              </div>

              <div className="bg-accent-500 rounded-2xl p-8 text-natural-900 border-4 border-accent-600 shadow-2xl relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-800 text-white px-6 py-2 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2 text-natural-900">Premium Membership</h3>
                <p className="text-4xl font-bold text-natural-900 mb-4">$350 <span className="text-lg font-normal text-natural-700">/year</span></p>
                <ul className="space-y-3 mb-6 text-natural-900">
                  <li className="flex items-start">
                    <span className="text-primary-800 mr-2 font-bold">✓</span>
                    <span><strong>All Classic benefits</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-800 mr-2 font-bold">✓</span>
                    <span><strong>Exclusive & limited releases</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-800 mr-2 font-bold">✓</span>
                    <span>Private winemaker sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-800 mr-2 font-bold">✓</span>
                    <span>Complimentary vineyard experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-800 mr-2 font-bold">✓</span>
                    <span>+1 guest privileges for all events</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-800 mr-2 font-bold">✓</span>
                    <span>Free shipping on all orders</span>
                  </li>
                </ul>
                <Button 
                  href={`mailto:${SITE_CONFIG.email}?subject=Wine Club Premium Membership Enquiry&body=Hi, I'd like to join the Premium Wine Club membership.%0D%0A%0D%0AName:%0D%0APhone:%0D%0AAddress:%0D%0A%0D%0AThank you!`}
                  variant="primary" 
                  className="w-full bg-primary-800 hover:bg-primary-700 text-white"
                  external
                >
                  Join Premium
                </Button>
              </div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <p className="text-lg text-white/90 mb-4">
                <strong>Not sure which membership is right for you?</strong> Contact us and we'll help you choose the perfect fit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href={`mailto:${SITE_CONFIG.email}?subject=Wine Club Enquiry`}
                  variant="accent"
                  size="lg"
                  external
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </Button>
                <Button 
                  href={`tel:${SITE_CONFIG.phone}`}
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-primary-800"
                  external
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book a Tasting */}
      <section id="book" className="py-20 bg-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Calendar className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Book Your Cellar Door Experience
            </h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Walk-ins are welcome, but bookings are recommended for groups and premium tastings to ensure the best experience.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 rounded-xl p-6 text-left">
                <Users className="w-8 h-8 text-accent mb-3" />
                <h3 className="text-xl font-bold mb-2">Walk-Ins Welcome</h3>
                <p className="text-white/80">
                  Drop by any day between 11 AM - 5 PM for our Classic Tasting. No booking required for groups under 4 people.
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-left">
                <Calendar className="w-8 h-8 text-accent mb-3" />
                <h3 className="text-xl font-bold mb-2">Book Ahead</h3>
                <p className="text-white/80">
                  Reserve your spot for Premium Tastings, Vineyard Experiences, or groups of 4+ people.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href={`mailto:${SITE_CONFIG.email}?subject=Cellar Door Tasting Booking&body=Hi, I'd like to book a wine tasting experience at Bayview Estate Cellar Door.%0D%0A%0D%0APreferred Date:%0D%0APreferred Time:%0D%0ANumber of Guests:%0D%0ATasting Experience (Classic/Premium/Vineyard):%0D%0A%0D%0AThank you!`}
                variant="accent"
                size="lg"
                external
              >
                <Mail className="w-5 h-5 mr-2" />
                Email to Book
              </Button>
              <Button 
                href={`tel:${SITE_CONFIG.phone}`}
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-primary-800"
                external
              >
                <Phone className="w-5 h-5 mr-2" />
                Call to Book
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Here */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
              Getting Here
            </h2>
            <p className="text-lg md:text-xl text-natural-700 mb-8">
              Just 90 minutes from Melbourne CBD, 15 minutes from Peninsula Hot Springs
            </p>
            <div className="bg-primary-400/20 rounded-2xl p-8 mb-8">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-lg text-primary-800 font-semibold mb-2">
                {SITE_CONFIG.address}
              </p>
              <p className="text-natural-700 mb-6">
                Ample free parking on-site, accessible parking available
              </p>
            </div>
            <Button 
              href="https://www.google.com/maps/dir/?api=1&destination=365+Purves+Road,+Main+Ridge,+Victoria+3928,+Australia"
              variant="primary"
              size="lg"
              external
            >
              Get Directions
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

