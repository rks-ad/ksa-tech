import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogs';

export function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-display font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-400 mb-8">The article you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="px-6 py-3 bg-ksa-neon text-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ksa-dark via-ksa-dark/80 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative -mt-32 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 md:p-12 border-ksa-border bg-ksa-card"
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-ksa-neon transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-wider mb-6">
            <span className="flex items-center gap-1 text-ksa-neon border border-ksa-neon/30 px-3 py-1 rounded-full bg-ksa-neon/5">
              <Tag className="w-3 h-3" /> {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-8">
            {post.title}
          </h1>

          <div className="prose prose-invert prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-300 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-ksa-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ksa-neon/20 flex items-center justify-center border border-ksa-neon/50">
                <span className="text-ksa-neon font-bold font-display">KSA</span>
              </div>
              <div>
                <div className="font-bold text-white">KSA Tech Editorial</div>
                <div className="text-xs text-gray-500 font-mono">IT & Cloud Experts</div>
              </div>
            </div>
            
            <Link to="/contact" className="px-6 py-3 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-ksa-neon transition-colors">
              Discuss Your Project
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
