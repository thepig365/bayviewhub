import React from 'react'
import { Button } from '@/components/ui/Button'
import { Clock, Users, AlertCircle } from 'lucide-react'

const tasterWorkshops = [
  {
    title: 'Expressive Painting',
    duration: '2 hours',
    price: '$65',
    description: 'Explore color, texture, and intuitive mark-making in a supportive group setting.',
  },
  {
    title: 'Clay & Mindfulness',
    duration: '2 hours',
    price: '$75',
    description: 'Tactile clay work combined with mindfulness practices for stress relief.',
  },
  {
    title: 'Nature Journaling',
    duration: '2 hours',
    price: '$60',
    description: 'Drawing and writing exercises inspired by the gardens and landscape.',
  },
]

const programs = [
  {
    title: '6-Week Adult Program',
    format: 'Weekly sessions',
    price: '$420',
    description: 'Deeper exploration of expressive arts for personal growth and wellbeing.',
    features: ['Small group (max 8)', 'All materials included', 'Take-home practices'],
  },
  {
    title: '6-Week Parent & Child',
    format: 'Weekly sessions',
    price: '$380',
    description: 'Creative connection time for parents/carers and children aged 5-12.',
    features: ['Bonding through art', 'Age-appropriate activities', 'Family toolkit'],
  },
]

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen dark:bg-primary-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-50 to-primary-50 py-20 dark:from-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Art Workshops & Wellbeing
            </h1>
            <p className="text-xl text-natural-700 leading-relaxed max-w-3xl mx-auto dark:text-natural-200">
              Expressive arts programs for wellbeing, creativity, and connection. Guided by qualified professionals in a safe, supportive environment.
            </p>
          </div>
        </div>
      </section>

      {/* Taster Workshops */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                Taster Workshops
              </h2>
              <p className="text-lg text-natural-600 dark:text-natural-200">
                Try a single session to experience expressive arts practices
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {tasterWorkshops.map((workshop) => (
                <div key={workshop.title} className="bg-natural-50 rounded-2xl p-8 shadow-lg dark:bg-primary-900/60 dark:border dark:border-primary-700">
                  <h3 className="text-2xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                    {workshop.title}
                  </h3>
                  <div className="flex items-center space-x-4 mb-4 text-sm text-natural-600 dark:text-natural-200">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {workshop.duration}
                    </div>
                    <div className="font-bold text-primary-700 text-lg">
                      {workshop.price}
                    </div>
                  </div>
                  <p className="text-natural-700 mb-6 leading-relaxed dark:text-natural-200">
                    {workshop.description}
                  </p>
                  <Button variant="primary" size="md" className="w-full">
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6-Week Programs */}
      <section className="py-20 bg-natural-50 dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                6-Week Programs
              </h2>
              <p className="text-lg text-natural-600 dark:text-natural-200">
                Deeper exploration and sustained practice over six weeks
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {programs.map((program) => (
                <div key={program.title} className="bg-white rounded-2xl p-8 shadow-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
                  <h3 className="text-2xl font-serif font-bold text-natural-900 mb-2 dark:text-natural-50">
                    {program.title}
                  </h3>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-natural-600 dark:text-natural-200">{program.format}</span>
                    <span className="text-2xl font-bold text-primary-700">{program.price}</span>
                  </div>
                  <p className="text-natural-700 mb-6 leading-relaxed dark:text-natural-200">
                    {program.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-natural-700">
                        <Users className="w-4 h-4 mr-2 text-primary-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="accent" size="lg" className="w-full">
                    Apply / Book
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Notice */}
      <section className="py-16 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-accent-50 border-l-4 border-accent-600 rounded-lg p-6 dark:bg-primary-800/30 dark:border-primary-300">
              <div className="flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-accent-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-natural-900 mb-3 dark:text-natural-50">
                    Important Information
                  </h3>
                  <div className="space-y-2 text-sm text-natural-700 dark:text-natural-200">
                    <p>
                      <strong>Non-clinical wellbeing focus:</strong> Our programs use expressive arts for wellbeing and personal growth. They are not a substitute for clinical therapy or mental health treatment.
                    </p>
                    <p>
                      <strong>Crisis support:</strong> If you are experiencing a mental health crisis, please contact Lifeline (13 11 14), Beyond Blue (1300 22 4636), or emergency services (000).
                    </p>
                    <p>
                      <strong>Qualified practitioners:</strong> All programs are led by qualified art therapists or expressive arts practitioners with professional indemnity insurance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-natural-50 dark:from-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Ready to Begin?
            </h2>
            <p className="text-xl text-natural-700 mb-8 dark:text-natural-200">
              Join us for a creative journey of self-expression and discovery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Book a Taster Workshop
              </Button>
              <Button variant="outline" size="lg">
                Learn More About Programs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

