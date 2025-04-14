
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Cpu, 
  BookOpen, 
  Database, 
  Network, 
  Code, 
  Shield, 
  BarChart,
  Cloud,
  Check
} from 'lucide-react';

const Technology = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <Cpu className="h-10 w-10 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold">Our Technology</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the cutting-edge technologies powering AI Scribe's intelligent text processing capabilities.
          </p>
        </section>
        
        {/* Core Technology Tabs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Core Technologies</h2>
          
          <Tabs defaultValue="nlp" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="nlp" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                NLP
              </TabsTrigger>
              <TabsTrigger value="ml" className="flex items-center">
                <Network className="mr-2 h-4 w-4" />
                Machine Learning
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center">
                <Code className="mr-2 h-4 w-4" />
                API Architecture
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="nlp" className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Natural Language Processing</h3>
              <p className="text-gray-600 mb-6">
                Our advanced NLP engine can understand text at a deep semantic level, identifying context, 
                sentiment, entities, and relationships between concepts.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Semantic Analysis</h4>
                  <p className="text-gray-600">Understanding meaning and context beyond simple keyword matching</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Entity Recognition</h4>
                  <p className="text-gray-600">Identifying people, organizations, dates, and other key information</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Sentiment Analysis</h4>
                  <p className="text-gray-600">Detecting emotions and opinions expressed in text</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Language Generation</h4>
                  <p className="text-gray-600">Creating coherent, contextually appropriate text responses</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ml" className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Machine Learning</h3>
              <p className="text-gray-600 mb-6">
                AI Scribe utilizes state-of-the-art neural network architectures to process and understand text data 
                at scale, with continuous learning capabilities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Transformer Models</h4>
                  <p className="text-gray-600">Utilizing attention mechanisms for superior language understanding</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Transfer Learning</h4>
                  <p className="text-gray-600">Applying knowledge from general language models to specific domains</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Reinforcement Learning</h4>
                  <p className="text-gray-600">Improving models through feedback and optimization</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Few-Shot Learning</h4>
                  <p className="text-gray-600">Adapting to new tasks with minimal examples</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">API Architecture</h3>
              <p className="text-gray-600 mb-6">
                Our scalable API infrastructure allows seamless integration of AI Scribe capabilities 
                into any application or workflow.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">RESTful Endpoints</h4>
                  <p className="text-gray-600">Simple, standardized interfaces for easy integration</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Real-time Processing</h4>
                  <p className="text-gray-600">Low-latency responses for interactive applications</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Webhooks</h4>
                  <p className="text-gray-600">Event-driven architecture for asynchronous processing</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">SDK Libraries</h4>
                  <p className="text-gray-600">Client libraries in multiple languages for rapid development</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Technical Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Stack</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center space-x-2">
                <Cloud className="h-6 w-6 text-indigo-600" />
                <CardTitle>Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.9868 3.5493L22.2868 11.8493C22.5795 12.1419 22.7368 12.5651 22.7368 13.0493C22.7368 13.5335 22.5795 13.9567 22.2868 14.2493L13.9868 22.5493C13.6942 22.842 13.271 22.9993 12.7868 22.9993C12.3026 22.9993 11.8794 22.842 11.5868 22.5493L3.28677 14.2493C2.99409 13.9567 2.83677 13.5335 2.83677 13.0493C2.83677 12.5651 2.99409 12.1419 3.28677 11.8493L11.5868 3.5493C11.8794 3.25662 12.3026 3.0993 12.7868 3.0993C13.271 3.0993 13.6942 3.25662 13.9868 3.5493Z" />
                      </svg>
                    </div>
                    <span>AWS Cloud Infrastructure</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 8C21 6.34315 19.6569 5 18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19H18C19.6569 19 21 17.6569 21 16V8ZM19 8V16C19 16.5523 18.5523 17 18 17H6C5.44772 17 5 16.5523 5 16V8C5 7.44772 5.44772 7 6 7H18C18.5523 7 19 7.44772 19 8Z" />
                      </svg>
                    </div>
                    <span>Docker Containerization</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" />
                      </svg>
                    </div>
                    <span>Kubernetes Orchestration</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" />
                      </svg>
                    </div>
                    <span>Global CDN Distribution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center space-x-2">
                <Database className="h-6 w-6 text-indigo-600" />
                <CardTitle>Data Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 5V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5ZM13 8V16H11V8H13ZM9 12V16H7V12H9ZM17 7V16H15V7H17Z" />
                      </svg>
                    </div>
                    <span>Apache Spark for Distributed Processing</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM16 11H13V8H11V11H8V13H11V16H13V13H16V11ZM13 8V4.5L16.5 8H13Z" />
                      </svg>
                    </div>
                    <span>TensorFlow and PyTorch Models</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 12L17.5 10.5L15 12V4H20V12Z" />
                      </svg>
                    </div>
                    <span>PostgreSQL and MongoDB Databases</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 20H18V4H14V3C14 2.45 13.55 2 13 2H11C10.45 2 10 2.45 10 3V4H6V20ZM11 4H13V4.97H11V4ZM14 11H10V8H14V11Z" />
                      </svg>
                    </div>
                    <span>Redis for Caching</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Security Section */}
        <section>
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold">Security & Privacy</h2>
          </div>
          
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-none shadow-md">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Data Protection</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>End-to-end encryption for all data transfers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Secure data storage with encryption at rest</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Automated data retention policies</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>GDPR and CCPA compliant data handling</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Infrastructure Security</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Regular security audits and penetration testing</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Multi-factor authentication for all systems</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Intrusion detection and prevention systems</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>SOC 2 Type II certified operations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Technology;
