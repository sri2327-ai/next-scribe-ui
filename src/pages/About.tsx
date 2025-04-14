
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Sparkles, 
  Zap, 
  Users, 
  Target,
  Check 
} from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Alex Morgan",
      role: "AI Researcher",
      avatar: "A",
      bio: "PhD in Computational Linguistics with 10+ years experience in NLP research."
    },
    {
      name: "Sam Taylor",
      role: "Lead Developer",
      avatar: "S",
      bio: "Full-stack engineer specializing in AI integrations and scalable architectures."
    },
    {
      name: "Jordan Lee",
      role: "UX Designer",
      avatar: "J",
      bio: "Human-computer interaction expert focused on creating intuitive AI interfaces."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <BookOpen className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold">Our Mission</h1>
          </div>
          
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-none shadow-md">
            <CardContent className="pt-6">
              <p className="text-xl leading-relaxed text-center max-w-4xl mx-auto">
                At AI Scribe, we're dedicated to transforming how people interact with text. 
                Our mission is to democratize access to advanced language understanding, 
                helping individuals and organizations unlock deeper insights and communicate more effectively.
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* Values Section */}
        <section className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold">Our Values</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold">Innovation</h3>
              </div>
              <p className="text-gray-600">
                We constantly push the boundaries of what's possible with AI and language processing.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold">Accessibility</h3>
              </div>
              <p className="text-gray-600">
                We believe advanced AI should be available to everyone, regardless of technical expertise.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold">Transparency</h3>
              </div>
              <p className="text-gray-600">
                We're committed to ethical AI practices with clear explanation of how our technology works.
              </p>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Users className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold">Our Team</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-indigo-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Company History */}
        <section>
          <div className="flex items-center justify-center mb-8">
            <BookOpen className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold">Our Journey</h2>
          </div>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="bg-indigo-600 rounded-full p-2">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div className="h-full w-0.5 bg-indigo-200 mt-2"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">2020: Founded</h3>
                <p className="text-gray-600 mt-2">
                  AI Scribe was founded by a team of language processing experts and AI researchers 
                  with a vision to revolutionize text analysis.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="bg-indigo-600 rounded-full p-2">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div className="h-full w-0.5 bg-indigo-200 mt-2"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">2021: First Platform Launch</h3>
                <p className="text-gray-600 mt-2">
                  Released our first version of the AI Scribe platform, offering basic 
                  text analysis and content improvement suggestions.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="bg-indigo-600 rounded-full p-2">
                  <Check className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Today: Expanding Possibilities</h3>
                <p className="text-gray-600 mt-2">
                  Now serving thousands of users worldwide, we continue to innovate and expand 
                  our capabilities, bringing advanced AI text processing to more industries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
