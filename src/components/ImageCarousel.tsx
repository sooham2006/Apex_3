import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Grid, Maximize2 } from 'lucide-react';

const images = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
    title: 'Mountain Landscape',
    description: 'Breathtaking mountain scenery with misty peaks',
    category: 'Nature'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg',
    title: 'Alpine Dawn',
    description: 'Golden sunrise over alpine meadows',
    category: 'Nature'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    title: 'Forest Path',
    description: 'Serene woodland trail in autumn colors',
    category: 'Nature'
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg',
    title: 'Ocean Waves',
    description: 'Powerful waves crashing against rocky shores',
    category: 'Ocean'
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
    title: 'Desert Dunes',
    description: 'Golden sand dunes under starlit sky',
    category: 'Desert'
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
    title: 'City Skyline',
    description: 'Modern urban architecture at twilight',
    category: 'Urban'
  },
  {
    id: 7,
    url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg',
    title: 'Tropical Beach',
    description: 'Crystal clear waters and white sand',
    category: 'Ocean'
  },
  {
    id: 8,
    url: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
    title: 'Northern Lights',
    description: 'Aurora borealis dancing in the night sky',
    category: 'Sky'
  },
  {
    id: 9,
    url: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
    title: 'Waterfall',
    description: 'Cascading water through lush greenery',
    category: 'Nature'
  },
  {
    id: 10,
    url: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
    title: 'Lavender Fields',
    description: 'Purple lavender stretching to the horizon',
    category: 'Nature'
  },
  {
    id: 11,
    url: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
    title: 'Cherry Blossoms',
    description: 'Pink sakura petals in spring bloom',
    category: 'Nature'
  },
  {
    id: 12,
    url: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg',
    title: 'Canyon Vista',
    description: 'Red rock formations carved by time',
    category: 'Desert'
  },
  {
    id: 13,
    url: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    title: 'Starry Night',
    description: 'Milky Way galaxy over mountain silhouettes',
    category: 'Sky'
  },
  {
    id: 14,
    url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
    title: 'Autumn Forest',
    description: 'Golden leaves carpeting the forest floor',
    category: 'Nature'
  },
  {
    id: 15,
    url: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg',
    title: 'Lighthouse',
    description: 'Beacon of light guiding ships to safety',
    category: 'Ocean'
  },
  {
    id: 16,
    url: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg',
    title: 'Sunflower Field',
    description: 'Bright yellow sunflowers facing the sun',
    category: 'Nature'
  },
  {
    id: 17,
    url: 'https://images.pexels.com/photos/4100130/pexels-photo-4100130.jpeg',
    title: 'Ice Cave',
    description: 'Blue ice formations in glacial cave',
    category: 'Ice'
  },
  {
    id: 18,
    url: 'https://images.pexels.com/photos/4666748/pexels-photo-4666748.jpeg',
    title: 'Bamboo Forest',
    description: 'Tall bamboo creating natural corridors',
    category: 'Nature'
  },
  {
    id: 19,
    url: 'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg',
    title: 'Volcanic Landscape',
    description: 'Dramatic volcanic terrain with steam',
    category: 'Volcanic'
  },
  {
    id: 20,
    url: 'https://images.pexels.com/photos/5255553/pexels-photo-5255553.jpeg',
    title: 'Coral Reef',
    description: 'Vibrant underwater coral ecosystem',
    category: 'Ocean'
  },
  {
    id: 21,
    url: 'https://images.pexels.com/photos/5594435/pexels-photo-5594435.jpeg',
    title: 'Prairie Sunset',
    description: 'Golden hour over endless grasslands',
    category: 'Prairie'
  },
  {
    id: 22,
    url: 'https://images.pexels.com/photos/6032877/pexels-photo-6032877.jpeg',
    title: 'Glacier Lake',
    description: 'Pristine lake surrounded by glacial peaks',
    category: 'Ice'
  },
  {
    id: 23,
    url: 'https://images.pexels.com/photos/6580900/pexels-photo-6580900.jpeg',
    title: 'Rainforest Canopy',
    description: 'Dense tropical rainforest from above',
    category: 'Nature'
  },
  {
    id: 24,
    url: 'https://images.pexels.com/photos/7135037/pexels-photo-7135037.jpeg',
    title: 'Sand Dunes',
    description: 'Rippling patterns in desert sand',
    category: 'Desert'
  },
  {
    id: 25,
    url: 'https://images.pexels.com/photos/7919/pexels-photo.jpg',
    title: 'Mountain Lake',
    description: 'Mirror-like lake reflecting mountain peaks',
    category: 'Nature'
  },
  {
    id: 26,
    url: 'https://images.pexels.com/photos/8588/pexels-photo.jpg',
    title: 'Coastal Cliffs',
    description: 'Dramatic cliffs overlooking the ocean',
    category: 'Ocean'
  },
  {
    id: 27,
    url: 'https://images.pexels.com/photos/33109/pexels-photo.jpg',
    title: 'City Bridge',
    description: 'Architectural marvel spanning the river',
    category: 'Urban'
  },
  {
    id: 28,
    url: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg',
    title: 'Wildlife Safari',
    description: 'Majestic animals in their natural habitat',
    category: 'Wildlife'
  },
  {
    id: 29,
    url: 'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg',
    title: 'Hot Air Balloons',
    description: 'Colorful balloons floating over landscape',
    category: 'Sky'
  },
  {
    id: 30,
    url: 'https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg',
    title: 'Rolling Hills',
    description: 'Green hills under dramatic cloudy sky',
    category: 'Nature'
  }
];

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];
  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  useEffect(() => {
    if (isAutoPlay && viewMode === 'carousel') {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, viewMode, filteredImages.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Interactive Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Explore our curated collection of stunning photography with advanced carousel and grid views
          </p>
          
          {/* Controls */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            <div className="flex bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-white/60 shadow-sm">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'carousel'
                    ? 'bg-purple-400 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Maximize2 className="inline mr-2" size={16} />
                Carousel
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-purple-400 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Grid className="inline mr-2" size={16} />
                Grid
              </button>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentIndex(0);
              }}
              className="bg-white/80 backdrop-blur-sm text-gray-700 border border-white/60 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-white">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {viewMode === 'carousel' ? (
          <>
            {/* Main Carousel */}
            <div className="relative max-w-6xl mx-auto mb-8">
              <div className="relative h-96 md:h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
                {/* Images */}
                <div 
                  className="flex transition-transform duration-700 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {filteredImages.map((image, index) => (
                    <div key={image.id} className="w-full h-full flex-shrink-0 relative group">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span className="bg-purple-400/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                          {image.category}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                          {image.title}
                        </h3>
                        <p className="text-gray-200 text-lg mb-4">
                          {image.description}
                        </p>
                        <div className="flex items-center text-gray-300 text-sm">
                          <span>{index + 1} of {filteredImages.length}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/95 backdrop-blur-sm rounded-full p-4 transition-all duration-200 group shadow-lg"
                >
                  <ChevronLeft className="text-gray-700 group-hover:scale-110 transition-transform duration-200" size={28} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/95 backdrop-blur-sm rounded-full p-4 transition-all duration-200 group shadow-lg"
                >
                  <ChevronRight className="text-gray-700 group-hover:scale-110 transition-transform duration-200" size={28} />
                </button>

                {/* Auto-play Control */}
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="absolute top-4 left-4 bg-white/80 hover:bg-white/95 backdrop-blur-sm rounded-full p-3 transition-all duration-200 shadow-lg"
                >
                  {isAutoPlay ? (
                    <Pause className="text-gray-700" size={20} />
                  ) : (
                    <Play className="text-gray-700" size={20} />
                  )}
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-6 overflow-x-auto pb-2">
                {filteredImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 flex-shrink-0 ${
                      index === currentIndex
                        ? 'bg-purple-400 scale-125 shadow-sm'
                        : 'bg-white/70 hover:bg-white/90 shadow-sm'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="max-w-6xl mx-auto">
              <div className="flex space-x-3 overflow-x-auto pb-4">
                {filteredImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(index)}
                    className={`relative h-20 w-32 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                      index === currentIndex
                        ? 'ring-4 ring-purple-400 scale-105 shadow-lg'
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-purple-400/20" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 right-2">
                  <span className="bg-purple-400/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                    {image.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {image.title}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/60 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">{filteredImages.length}</div>
              <div className="text-gray-600 text-sm">Images</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">{categories.length - 1}</div>
              <div className="text-gray-600 text-sm">Categories</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">{viewMode === 'carousel' ? 'Carousel' : 'Grid'}</div>
              <div className="text-gray-600 text-sm">View Mode</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;