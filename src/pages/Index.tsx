
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Brain, Lightbulb } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Welcome to AI Scribe
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Transforming how you interact with text through advanced AI technology
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/about">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/technology">
              <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                Explore Technology
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>Advanced Text Analysis</CardTitle>
                <CardDescription>
                  Powerful algorithms that understand context and meaning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI can parse complex documents and extract meaningful insights automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Brain className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>Machine Learning Core</CardTitle>
                <CardDescription>
                  Self-improving models that get better with each interaction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Built on cutting-edge neural networks that continuously adapt to your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Lightbulb className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>Intelligent Suggestions</CardTitle>
                <CardDescription>
                  Contextual recommendations to enhance your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get real-time suggestions for improving clarity, style, and impact of your text.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
