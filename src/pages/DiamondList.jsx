import React, { useState } from 'react';
// import './DiamondList.css'; // Import your CSS file

const DiamondList = ({ diamonds, setActiveStep }) => {
    const [showFilters, setShowFilters] = useState(true);
    const [selectedOrigin, setSelectedOrigin] = useState('natural');
    const [selectedQuality, setSelectedQuality] = useState('sparkle');
    const [selectedCut, setSelectedCut] = useState(1);
    const [selectedShape, setSelectedShape] = useState('round');
    const [caratRange, setCaratRange] = useState([1, 18.53]);
    const [colorRange, setColorRange] = useState([0, 4]);
    const [cutRange, setCutRange] = useState([0,2]);
    const [priceRange, setPriceRange] = useState([0, 3000]);
    const [polishRange, setPolishRange] = useState(['Excellent', 'Ideal']);
    const [clarityRange, setClarityRange] = useState([0, 5]);
    const [diamondType, setDiamondType] = useState('Lab Created Diamonds');

    return (
        <div className="flex flex-wrap">
            <div className="w-full mx-0 md:mx-auto p-6 pl-0 pr-0 md:pr-6 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(100vh - 150px)' }} >
                <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white p-4 sm:p-6 rounded-lg">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-left">
                                    SHAPE
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                                    {['Round','Oval','Cushion','Pear','Emerald','Radiant','Princess','Marquise','Asscher','Heart','Elongated Cushion'].map((shape) => (
                                        <button 
                                            key={shape}
                                            className={`p-2 border-2 border-gray-200 rounded-full ${selectedShape.includes(shape) ? 'text-orange-800 border-orange-800' : 'text-gray-600'} text-sm`}
                                            style={{ borderRadius: '8px' }}
                                            onClick={() => {
                                                if (selectedShape.includes(shape)) {
                                                    setSelectedShape(selectedShape.filter(s => s !== shape));
                                                } else {
                                                    setSelectedShape([...selectedShape, shape]);
                                                }
                                            }}
                                        >
                                            <img src={`assets/shape-svg/${shape.toLowerCase()}.svg`} alt={shape} className="max-w-50 max-h-50 mx-auto mb-2" style={{ width: '40px', height: '40px' }} />
                                            {shape.charAt(0).toUpperCase() + shape.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 sm:p-6 rounded-lg">
                            <div className="flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold">
                                        CARAT SIZE
                                        <span className="ml-2">
                                            <i className="fas fa-gem"></i>
                                        </span>
                                    </h3>
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium">$</span>
                                        <input 
                                            type="number"
                                            value={caratRange[0].toFixed(2)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
                                                if (newValue < caratRange[1]) {
                                                    setCaratRange([Number(newValue.toFixed(2)), caratRange[1]]);
                                                }
                                            }}
                                            className="w-20 p-0.5 text-sm border rounded text-center"
                                            min="0"
                                            step="0.01"
                                        />
                                        <span className="mx-2">to</span>
                                        <span className="text-sm font-medium">$</span>
                                        <input
                                            type="number" 
                                            value={caratRange[1].toFixed(2)}
                                            onChange={(e) => {
                                                const newValue = parseFloat(e.target.value);
                                                if (newValue > caratRange[0]) {
                                                    setCaratRange([caratRange[0], Number(newValue.toFixed(2))]);
                                                }
                                            }}
                                            className="w-20 p-0.5 text-sm border rounded text-center"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                                <div className="relative w-full h-1 bg-gray-200 rounded-full mt-4">
                                    <div
                                        className="absolute h-full bg-orange-800 rounded-full"
                                        style={{
                                            left: `${(caratRange[0] / 20) * 100}%`,
                                            width: `${((caratRange[1] - caratRange[0]) / 20) * 100}%`
                                        }}
                                    ></div>
                                    <div 
                                        className="absolute -top-1 w-3 h-3 bg-white border-2 border-orange-800 rounded-full cursor-pointer"
                                        style={{left: `calc(${(caratRange[0] / 20) * 100}%)`}}
                                        onMouseDown={(e) => {
                                            const slider = e.target.parentElement;
                                            const handleDrag = (moveEvent) => {
                                                const rect = slider.getBoundingClientRect();
                                                const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                                                const newValue = percent * 20;
                                                if (newValue < caratRange[1]) {
                                                    setCaratRange([newValue, caratRange[1]]);
                                                }
                                            };
                                            const stopDrag = () => {
                                                document.removeEventListener('mousemove', handleDrag);
                                                document.removeEventListener('mouseup', stopDrag);
                                            };
                                            document.addEventListener('mousemove', handleDrag);
                                            document.addEventListener('mouseup', stopDrag);
                                        }}
                                    ></div>
                                    <div 
                                        className="absolute -top-1 w-3 h-3 bg-white border-2 border-orange-800 rounded-full cursor-pointer"
                                        style={{left: `calc(${(caratRange[1] / 20) * 100}%)`}}
                                        onMouseDown={(e) => {
                                            const slider = e.target.parentElement;
                                            const handleDrag = (moveEvent) => {
                                                const rect = slider.getBoundingClientRect();
                                                const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                                                const newValue = percent * 20;
                                                if (newValue > caratRange[0]) {
                                                    setCaratRange([caratRange[0], newValue]);
                                                }
                                            };
                                            const stopDrag = () => {
                                                document.removeEventListener('mousemove', handleDrag);
                                                document.removeEventListener('mouseup', stopDrag);
                                            };
                                            document.addEventListener('mousemove', handleDrag);
                                            document.addEventListener('mouseup', stopDrag);
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex flex-col mt-12">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold">PRICE</h3>
                                    <div className="flex items-center">
                                        <span className="mr-1 text-sm">$</span>
                                        <input
                                            type="number"
                                            value={priceRange[0].toFixed(2)}
                                            onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                                            className="w-20 p-0.5 text-sm border rounded text-center"
                                            step="0.01"
                                            min="0"
                                            max="3000"
                                        />
                                        <span className="mx-1 text-sm">-</span>
                                        <span className="mr-1 text-sm">$</span>
                                        <input
                                            type="number"
                                            value={priceRange[1].toFixed(2)} 
                                            onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                                            className="w-20 p-0.5 text-sm border rounded text-center"
                                            step="0.01"
                                            min="0"
                                            max="3000"
                                        />
                                    </div>
                                </div>
                                <div className="relative w-full h-1 bg-gray-200 rounded">
                                    <div
                                        className="absolute h-full bg-orange-800 rounded"
                                        style={{
                                            left: `${(priceRange[0] / 3000) * 100}%`,
                                            width: `${((priceRange[1] - priceRange[0]) / 3000) * 100}%`
                                        }}
                                    ></div>
                                    <div 
                                        className="absolute -top-1 w-3 h-3 bg-white border-2 border-orange-800 rounded-full cursor-pointer"
                                        style={{left: `calc(${(priceRange[0] / 3000) * 100}%)`}}
                                        onMouseDown={(e) => {
                                            const slider = e.target.parentElement;
                                            const handleDrag = (moveEvent) => {
                                                const rect = slider.getBoundingClientRect();
                                                const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                                                const newValue = percent * 3000;
                                                if (newValue < priceRange[1]) {
                                                    setPriceRange([newValue, priceRange[1]]);
                                                }
                                            };
                                            const stopDrag = () => {
                                                document.removeEventListener('mousemove', handleDrag);
                                                document.removeEventListener('mouseup', stopDrag);
                                            };
                                            document.addEventListener('mousemove', handleDrag);
                                            document.addEventListener('mouseup', stopDrag);
                                        }}
                                    ></div>
                                    <div 
                                        className="absolute -top-1 w-3 h-3 bg-white border-2 border-orange-800 rounded-full cursor-pointer"
                                        style={{left: `calc(${(priceRange[1] / 3000) * 100}%)`}}
                                        onMouseDown={(e) => {
                                            const slider = e.target.parentElement;
                                            const handleDrag = (moveEvent) => {
                                                const rect = slider.getBoundingClientRect();
                                                const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                                                const newValue = percent * 3000;
                                                if (newValue > priceRange[0]) {
                                                    setPriceRange([priceRange[0], newValue]);
                                                }
                                            };
                                            const stopDrag = () => {
                                                document.removeEventListener('mousemove', handleDrag);
                                                document.removeEventListener('mouseup', stopDrag);
                                            };
                                            document.addEventListener('mousemove', handleDrag);
                                            document.addEventListener('mouseup', stopDrag);
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 sm:p-6 rounded-lg">
                            <div className="space-y-6">
                                {/* Color Filter */}
                                <div>
                                    <label className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Color</span>
                                        <span className="text-xs text-gray-500 cursor-help">?</span>
                                    </label>
                                    <div className="flex justify-around mt-3 mb-2">
                                        <span className="text-xs">G</span>
                                        <span className="text-xs">F</span>
                                        <span className="text-xs">E</span>
                                        <span className="text-xs">D</span>
                                    </div>
                                    <div className="relative h-1 bg-gray-200 rounded">
                                        <div 
                                            className="absolute h-full bg-orange-800 rounded"
                                            style={{
                                                left: `${(colorRange[0] / 4) * 100}%`,
                                                width: `${((colorRange[1] - colorRange[0]) / 4) * 100}%`
                                            }}
                                        ></div>
                                        <div 
                                            className="absolute -top-1 w-3 h-3 bg-white border-2 border-orange-800 rounded-full cursor-pointer"
                                            style={{left: `calc(${(colorRange[0] / 4) * 100}%)`}}
                                            onMouseDown={(e) => {
                                                const slider = e.target.parentElement;
                                                const handleDrag = (moveEvent) => {
                                                    const rect = slider.getBoundingClientRect();
                                                    const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                                                    const newValue = Math.floor(percent * 4);
                                                    if (newValue < colorRange[1]) {
                                                        setColorRange([newValue, colorRange[1]]);
                                                    }
                                                };
                                                const stopDrag = () => {
                                                    document.removeEventListener('mousemove', handleDrag);
                                                    document.removeEventListener('mouseup', stopDrag);
                                                };
                                                document.addEventListener('mousemove', handleDrag);
                                                document.addEventListener('mouseup', stopDrag);
                                            }}
                                        ></div>
                                        <div 
                                            className="absolute -top-1 w-3 h-3 bg-white border-2 border-orange-800 rounded-full cursor-pointer"
                                            style={{left: `calc(${(colorRange[1] / 4) * 100}%)`}}
                                            onMouseDown={(e) => {
                                                const slider = e.target.parentElement;
                                                const handleDrag = (moveEvent) => {
                                                    const rect = slider.getBoundingClientRect();
                                                    const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                                                    const newValue = Math.floor(percent * 4);
                                                    if (newValue > colorRange[0]) {
                                                        setColorRange([colorRange[0], newValue]);
                                                    }
                                                };
                                                const stopDrag = () => {
                                                    document.removeEventListener('mousemove', handleDrag);
                                                    document.removeEventListener('mouseup', stopDrag);
                                                };
                                                document.addEventListener('mousemove', handleDrag);
                                                document.addEventListener('mouseup', stopDrag);
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Cut Filter */}
                                <div>
                                    <label className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Cut</span>
                                        <span className="text-xs text-gray-500 cursor-help">?</span>
                                    </label>
                                    <div className="flex justify-around mt-3 mb-2">
                                        <span className="text-xs">Excellent</span>
                                        <span className="text-xs">Ideal</span>
                                    </div>
                                    <div className="relative h-1 bg-gray-200 rounded">
                                        <div 
                                            className="absolute h-full bg-orange-800 rounded"
                                            style={{
                                                left: `${(cutRange[0] / 2) * 100}%`,
                                                width: `${((cutRange[1] - cutRange[0]) / 2) * 100}%`
                                            }}
                                        ></div>
                                        <div 
                                            className="absolute -top-1 w-3 h-3 bg-white border-2 border-orange-800 rounded-full cursor-pointer"
                                            style={{left: `calc(${(cutRange[0] / 2) * 100}%)`}}
                                            onMouseDown={(e) => {
                                                const slider = e.target.parentElement;
                                                const handleDrag = (moveEvent) => {
                                                    const rect = slider.getBoundingClientRect();
                                                    const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                                                    const newValue = Math.floor(percent * 2);
                                                    if (newValue < cutRange[1]) {
                                                        setCutRange([newValue, cutRange[1]]);
                                                    }
                                                };
                                                const stopDrag = () => {
                                                    document.removeEventListener('mousemove', handleDrag);
                                                    document.removeEventListener('mouseup', stopDrag);
                                                };
                                                document.addEventListener('mousemove', handleDrag);
                                                document.addEventListener('mouseup', stopDrag);
                                            }}
                                        ></div>
                                        <div 
                                            className="absolute -top-1 w-3 h-3 bg-white border-2 border-orange-800 rounded-full cursor-pointer"
                                            style={{left: `calc(${(cutRange[1] / 2) * 100}%)`}}
                                            onMouseDown={(e) => {
                                                const slider = e.target.parentElement;
                                                const handleDrag = (moveEvent) => {
                                                    const rect = slider.getBoundingClientRect();
                                                    const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                                                    const newValue = Math.floor(percent * 2);
                                                    if (newValue > cutRange[0]) {
                                                        setCutRange([cutRange[0], newValue]);
                                                    }
                                                };
                                                const stopDrag = () => {
                                                    document.removeEventListener('mousemove', handleDrag);
                                                    document.removeEventListener('mouseup', stopDrag);
                                                };
                                                document.addEventListener('mousemove', handleDrag);
                                                document.addEventListener('mouseup', stopDrag);
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Clarity Filter */}
                                <div>
                                    <label className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Clarity</span>
                                        <span className="text-xs text-gray-500 cursor-help">?</span>
                                    </label>
                                    <div className="flex justify-around mt-3 mb-2">
                                        <span className="text-xs">FL</span>
                                        <span className="text-xs">IF</span>
                                        <span className="text-xs">VVS</span>
                                        <span className="text-xs">VS</span>
                                        <span className="text-xs">SI</span>
                                    </div>
                                    <div className="relative w-full h-1 bg-gray-200 rounded-full mt-4">
                                        <div 
                                            className="absolute h-full bg-orange-800 rounded"
                                            style={{
                                                left: `${(clarityRange[0] / 5) * 100}%`,
                                                width: `${((clarityRange[1] - clarityRange[0]) / 5) * 100}%`
                                            }}
                                        ></div>
                                        <div 
                                            className="absolute -top-1 w-3 h-3 bg-white border-2 border-orange-800 rounded-full cursor-pointer"
                                            style={{left: `calc(${(clarityRange[0] / 5) * 100}%)`}}
                                            onMouseDown={(e) => {
                                                const slider = e.target.parentElement;
                                                const handleDrag = (moveEvent) => {
                                                    const rect = slider.getBoundingClientRect();
                                                    const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                                                    const newValue = Math.floor(percent * 5);
                                                    if (newValue < clarityRange[1]) {
                                                        setClarityRange([newValue, clarityRange[1]]);
                                                    }
                                                };
                                                const stopDrag = () => {
                                                    document.removeEventListener('mousemove', handleDrag);
                                                    document.removeEventListener('mouseup', stopDrag);
                                                };
                                                document.addEventListener('mousemove', handleDrag);
                                                document.addEventListener('mouseup', stopDrag);
                                            }}
                                        ></div>
                                        <div 
                                            className="absolute -top-1 w-3 h-3 bg-white border-2 border-orange-800 rounded-full cursor-pointer"
                                            style={{left: `calc(${(clarityRange[1] / 5) * 100}%)`}}
                                            onMouseDown={(e) => {
                                                const slider = e.target.parentElement;
                                                const handleDrag = (moveEvent) => {
                                                    const rect = slider.getBoundingClientRect();
                                                    const percent = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1);
                                                    const newValue = Math.floor(percent * 5);
                                                    if (newValue > clarityRange[0]) {
                                                        setClarityRange([clarityRange[0], newValue]);
                                                    }
                                                };
                                                const stopDrag = () => {
                                                    document.removeEventListener('mousemove', handleDrag);
                                                    document.removeEventListener('mouseup', stopDrag);
                                                };
                                                document.addEventListener('mousemove', handleDrag);
                                                document.addEventListener('mouseup', stopDrag);
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-4 h-12">
                    <div className={`flex-1 border-t-2 border-b-2 py-3 border-gray-200 h-12 ${diamondType === 'Lab Created Diamonds' ? 'bg-gray-50 text-orange-800' : ''} cursor-pointer`} onClick={() => setDiamondType('Lab Created Diamonds')}>Lab Diamonds</div>
                    <div className='border-r-2 border-gray-200 h-12 border-1.5'></div>
                    <div className={`flex-1 border-t-2 border-b-2 py-3 border-gray-200 h-12 ${diamondType === 'Natural Diamonds' ? 'bg-gray-50 text-orange-800' : ''} cursor-pointer`} onClick={() => setDiamondType('Natural Diamonds')}>Natural Diamonds</div>
                </div>
                {/* Existing Table */}
                <div className="w-full mt-0 md:mt-8 h-full overflow-x-auto scrollbar-hide" style={{ maxHeight: 'calc(75vh - 250px)' }}>
                    <table className="min-w-full border-collapse">
                        <thead className="border-t-2 border-b-2 py-3 border-gray-200 sticky top-0 bg-white">
                            <tr>
                                <th className="p-3 text-center text-sm">Image</th>
                                <th className="p-3 text-center text-sm">Title</th>
                                <th className="p-3 text-center text-sm">Carat</th>
                                <th className="p-3 text-center text-sm">Color</th>
                                <th className="p-3 text-center text-sm">Clarity</th>
                                <th className="p-3 text-center text-sm">Price</th>
                                <th className="p-3 text-center text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diamonds?.map((diamond) => (
                                <tr key={diamond.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 min-w-[120px] md:min-w-[100px]">
                                        <img 
                                            src={diamond.images?.images[0]?.src} 
                                            alt={diamond.title}
                                            className="w-[100px] h-[100px] object-cover rounded"
                                        />
                                    </td>
                                    <td className="p-3 text-sm min-w-[160px]">{diamond.title}</td>
                                    <td className="p-3 text-sm">{diamond.carat}</td>
                                    <td className="p-3 text-sm">{diamond.color}</td>
                                    <td className="p-3 text-sm">{diamond.clarity}</td>
                                    <td className="p-3 text-sm">${diamond.price?.toLocaleString()}</td>
                                    <td className="p-3 text-center">
                                        <button 
                                            className="bg-orange-800 text-white px-4 py-2 rounded hover:bg-orange-900 transition-colors text-center"
                                            onClick={() => setActiveStep(3)}
                                        >
                                            <i className="fas fa-shopping-cart"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DiamondList;