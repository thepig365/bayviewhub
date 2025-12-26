import React from 'react'
import { Button } from '@/components/ui/Button'
import { MapPin, Clock, Phone, Mail, Car, Train } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function VisitPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-natural-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-natural-900 mb-6">
              Plan Your Visit
            </h1>
            <p className="text-xl text-natural-700 leading-relaxed">
              Everything you need to know for your visit to Bayview Hub
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Hours */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-natural-900 mb-6">
                Contact & Location
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-natural-900 mb-1">Address</h3>
                    <p className="text-natural-700">{SITE_CONFIG.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-natural-900 mb-1">Phone</h3>
                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="text-primary-700 hover:underline"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-natural-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-primary-700 hover:underline"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-natural-900 mb-6">
                Opening Hours
              </h2>
              <div className="bg-natural-50 rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-natural-200">
                    <span className="font-medium text-natural-900">Monday - Thursday</span>
                    <span className="text-natural-700">11:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-natural-200">
                    <span className="font-medium text-natural-900">Friday</span>
                    <span className="text-natural-700">11:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-natural-200">
                    <span className="font-medium text-natural-900">Saturday</span>
                    <span className="text-natural-700">9:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-natural-900">Sunday</span>
                    <span className="text-natural-700">9:00 AM - 8:00 PM</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-natural-200">
                  <p className="text-sm text-natural-600 flex items-start">
                    <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    Individual venue hours may vary. Check specific experiences for details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Here */}
      <section className="py-20 bg-natural-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-12 text-center">
              Getting Here
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-primary-100 rounded-full p-3">
                    <Car className="w-6 h-6 text-primary-700" />
                  </div>
                  <h3 className="text-xl font-bold text-natural-900">By Car</h3>
                </div>
                <ul className="space-y-3 text-natural-700">
                  <li>• 90 minutes from Melbourne CBD</li>
                  <li>• 15 minutes from Peninsula Hot Springs</li>
                  <li>• Free parking on-site</li>
                  <li>• Accessible parking available</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-primary-100 rounded-full p-3">
                    <Train className="w-6 h-6 text-primary-700" />
                  </div>
                  <h3 className="text-xl font-bold text-natural-900">Public Transport</h3>
                </div>
                <ul className="space-y-3 text-natural-700">
                  <li>• Main Ridge area, Mornington Peninsula</li>
                  <li>• Taxi and Uber services available</li>
                  <li>• Nearest major town: Rosebud (15 min)</li>
                  <li>• Plan your journey from Melbourne</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-natural-900 mb-8 text-center">
              Location & Nearby Attractions Map
            </h2>
            <div className="bg-natural-100 rounded-3xl overflow-hidden">
              {/* Google Maps Embed - Simple and Reliable */}
              <iframe
                src="https://maps.google.com/maps?q=365+Purves+Road,+Main+Ridge,+Victoria+3928,+Australia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="600"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bayview Hub and Nearby Attractions Map"
              ></iframe>
              
              {/* Map Legend */}
              <div className="p-6 bg-white border-t border-natural-200">
                <h3 className="font-bold text-natural-900 mb-4 text-center">Map Legend</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                    <span className="text-natural-700">Bayview Hub</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                    <span className="text-natural-700">Hot Springs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    <span className="text-natural-700">Adventure Parks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                    <span className="text-natural-700">Beaches</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-300 rounded-full"></div>
                    <span className="text-natural-700">Gardens</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-200 rounded-full"></div>
                    <span className="text-natural-700">Lighthouse</span>
                  </div>
                </div>
                
                {/* Quick Distance Reference */}
                <div className="mt-6 pt-6 border-t border-natural-200">
                  <h4 className="font-semibold text-natural-900 mb-3 text-center">Quick Distance Reference</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-natural-600">
                    <div className="text-center">
                      <div className="font-bold text-primary-600">5 min</div>
                      <div>Eagle Chairlift</div>
                      <div>Enchanted Maze</div>
                      <div>Greens Bush</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-primary-600">10-15 min</div>
                      <div>Hot Springs</div>
                      <div>Heronswood</div>
                      <div>Gunnamatta Beach</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-primary-600">20 min</div>
                      <div>Cape Schanck</div>
                      <div>Sorrento Beach</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-primary-600">25 min</div>
                      <div>Flinders Beach</div>
                      <div>Portsea Beach</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Directions Button */}
              <div className="p-6 bg-white border-t border-natural-200 text-center">
                <Button 
                  href="https://www.google.com/maps/dir/?api=1&destination=365+Purves+Road,+Main+Ridge,+Victoria+3928,+Australia"
                  variant="primary" 
                  size="lg"
                  external
                >
                  Get Directions to Bayview Hub
                </Button>
              </div>
            </div>
            
            {/* Alternative: Static Map Note */}
            <div className="mt-6 text-center">
              <p className="text-sm text-natural-600">
                📍 <strong>Tip:</strong> Click on markers to see attraction names and get directions to each location
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-20 bg-natural-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-4 text-center">
              Nearby Attractions
            </h2>
            <p className="text-lg text-natural-600 mb-12 text-center max-w-2xl mx-auto">
              Explore the beautiful Mornington Peninsula with these popular destinations
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Hot Springs */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Peninsula Hot Springs</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">15 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">Natural thermal mineral springs with hilltop pools and spa experiences</p>
                <a 
                  href="https://www.peninsulahotsprings.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Visit Website →
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Alba Hot Springs</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">15 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">Thermal mineral bathing and day spa in a natural bushland setting</p>
                <a 
                  href="https://www.albahotsprings.com.au" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Visit Website →
                </a>
              </div>

              {/* Adventure Activities */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Eagle Chairlift & Maze</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">5 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">Scenic chairlift rides with panoramic bay views and adventure maze</p>
                <a 
                  href="https://www.enchantedmaze.com.au" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Visit Website →
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Enchanted Adventure Garden</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">5 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">Tree surfing, canopy walks, mazes, and tube slides for all ages</p>
                <a 
                  href="https://www.enchantedmaze.com.au" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Visit Website →
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Greens Bush</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">5 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">Coastal heathland walks with stunning views and native wildlife</p>
                <a 
                  href="https://www.parks.vic.gov.au/places-to-see/parks/greens-bush" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Visit Website →
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Heronswood Gardens</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">10 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">Historic gardens, nursery, and cafe with seasonal displays</p>
                <a 
                  href="https://www.diggers.com.au/heronswood" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Visit Website →
                </a>
              </div>

              {/* Beaches */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Cape Schanck</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">20 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">Historic lighthouse, boardwalks, and dramatic coastal scenery</p>
                <a 
                  href="https://www.parks.vic.gov.au/places-to-see/sites/cape-schanck-lighthouse" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Visit Website →
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Gunnamatta Beach</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">15 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">Surf beach with powerful waves, popular with surfers and beach lovers</p>
                <a 
                  href="https://www.visitmorningtonpeninsula.org/gunnamatta-beach" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Learn More →
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Flinders Beach</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">25 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">Calm bay beach perfect for families, swimming, and rock pools</p>
                <a 
                  href="https://www.visitmorningtonpeninsula.org/flinders" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Learn More →
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Sorrento Front Beach</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">20 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">Protected bay beach with historic pier, cafes, and safe swimming</p>
                <a 
                  href="https://www.visitmorningtonpeninsula.org/sorrento" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Learn More →
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Portsea Beach</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">25 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">Bay and ocean beaches, rock pools, and the famous London Bridge rock formation</p>
                <a 
                  href="https://www.visitmorningtonpeninsula.org/portsea" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Learn More →
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-natural-900">Wineries & Breweries</h3>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">5-30 min</span>
                </div>
                <p className="text-natural-600 text-sm mb-4">100+ wineries and breweries throughout the Mornington Peninsula</p>
                <a 
                  href="https://www.visitmorningtonpeninsula.org/wineries" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Explore Wine Region →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cellar Door Section */}
      <section id="cellar" className="py-20 bg-natural-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-6">
              Cellar Door Tastings
            </h2>
            <p className="text-xl text-natural-700 mb-8 leading-relaxed">
              Experience our estate wines with guided tastings at The Pig & Whistle. Walk-ins welcome, or book ahead for private tastings and groups.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="https://www.thepigandwhistle.com.au" 
                variant="primary" 
                size="lg"
                external
              >
                Visit Pig & Whistle
              </Button>
              <Button 
                href="mailto:leonzh@bayviewestate.com.au?subject=Cellar Door Tasting Enquiry"
                variant="outline" 
                size="lg"
              >
                Book a Tasting
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ/Visitor Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-12 text-center">
              Visitor Information
            </h2>
            <div className="space-y-6">
              <div className="bg-natural-50 rounded-xl p-6">
                <h3 className="font-bold text-natural-900 mb-2">Accessibility</h3>
                <p className="text-natural-700">
                  Wheelchair accessible facilities, accessible parking, and assistance available. Please contact us in advance for specific needs.
                </p>
              </div>
              <div className="bg-natural-50 rounded-xl p-6">
                <h3 className="font-bold text-natural-900 mb-2">Family Friendly</h3>
                <p className="text-natural-700">
                  Children welcome at most venues. High chairs, change facilities, and kids menu available at the restaurant.
                </p>
              </div>
              <div className="bg-natural-50 rounded-xl p-6">
                <h3 className="font-bold text-natural-900 mb-2">Pets</h3>
                <p className="text-natural-700">
                  Well-behaved dogs welcome in outdoor areas. Please keep on leash and bring water bowls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

