import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogs';

export function Blog() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight mb-6">
            Industry <span className="text-ksa-neon">Insights</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Thoughts, news, and education on IT implementation, cloud architecture, and AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="group block h-full flex flex-col">
                <div className="aspect-video bg-ksa-card border border-ksa-border mb-6 relative overflow-hidden flex-shrink-0">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ksa-dark via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-br from-ksa-neon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">
                  <span className="text-ksa-neon">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-ksa-neon transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-white group-hover:text-ksa-neon transition-colors mt-auto pt-4">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
