import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    productDiscount: {
        type: Number,
        required: true,
        default: 0
    },
    currentPrice: {
        type: Number,
        required: true,
    },
    isOnOffer: {
        type: Boolean,
        required: true,
        default: false
    },
    offerName: {
        type: String,
    },
    compatibilityDetails: {
        socketType: {type:String},
        powerConsumption: {type:String},
        chipsetModel: {type:String},
        formFactor: {type:String},
        memorySlots: {type:String},
        expansionSlots: {type:String},
        storageInterface: {type:String},
        ramType: {type:String},
        ramFormFactor: {type:String, enum:['Desktop', 'Laptop', 'NA'], default: 'NA'},
        wattage: {type:String},
        networkCardInterfaces: {type:String}
    },
    warrantyDetails: {
        warrantyPeriod: {type: String, default: "1"},
        returnPeriod: {type: String, default: "7"}
    },
    featureDetails: {
        featureOne: {type: String},
        featureTwo: {type: String},
        featureThree: {type: String},
        featureFour: {type: String},
        featureFive: {type: String},
        featureSix: {type: String},
        featureSeven: {type: String},
        featureEight: {type: String},
        featureNine: {type: String},
        featureTen: {type: String},
    },
    specificationDetails: {
        modelNumber: {type:String},
        gpuChipset: {type:String},
        gpuModel: {type:String},
        pciExpress: {type:String},
        gpuBaseClock: {type:String},
        gpuBoostClock: {
            type: [String]
        },
        gpuMemoryClock: {type:String},
        gpuMemorySize: {type:String},
        gpuMemoryInterface: {type:String},
        gpuMemoryType: {type:String},
        gpuDirectX: {type:String},
        gpuOpenGl: {type:String},
        gpuResolution: {type:String},
        gpuPorts: {
            type: [String]
        },
        gpuPowerConnectors: {type:String},
        gpuCudaCores: {type:String},
        wattage: {type:String},
        networkCardInterfaces: {type:String},
        cpuModel: {type:String},
        cpuChipset: {type:String},
        cpuCores: {type:String},
        cpuThreads: {type:String},
        cpuBaseFrequency: {type:String},
        cpuMaxTurboFrequency: {type:String},
        cpuCache: {type:String},
        cpuBusSpeed: {type:String},
        cpuTDP: {type:String},
        cpuProcessorGraphics: {type:String},
        cpuSupportSockets: {type:String},
        moboCpu: {type:String},
        moboChipset: {type:String},
        moboMemory: {type:String},
        moboGraphics: {type:String},
        moboEthernet: {type:String},
        moboAudio: {type:String},
        moboExpansionSlots: {
            type: [String]
        },
        moboStorage: {
            type: [String]
        },
        moboUSB: {
            type: [String]
        },
        moboBackPanelIO: {
            type: [String]
        },
        moboInternalIO: {
            type: [String]
        },
        moboBIOS: {type:String},
        moboFormFactor:{type:String},
        moboOS: {type:String},
        RAMModel: {type:String},
        RAMMemorySeries: {type:String},
        RAMMemoryType: {type:String},
        RAMCapacity: {type:String},
        RAMKitType: {type:String},
        RAMSpeed: {type:String},
        coolerModelNumber: {type:String},
        coolerWaterBlock: {type:String},
        coolerFan: {type:String},
        coolerRadiator: {type:String},
        coolerPump: {type:String},
        coolerSockets: {type:String},
        coolerNoise: {type:String},
        coolerDimensions: {type:String},
        psuModelNumber: {type:String},
        psuFormFactor: {type:String},
        psuDimensions: {type:String},
        psuInputRange: {type:String},
        psuTotalOutput: {type:String},
        psuConnectors: {
            type: [String]
        },
        psuPackageContents: {
            type: [String]
        },
        psuEfficiency: {type:String},
        cabinetModelNumber: {type:String},
        cabinetChassis: {type:String},
        cabinetFormFactor: {type:String},
        cabinetPreinstalledFans: {type:String},
        cabinetDriveBays: {type:String},
        cabinetFanSupport: {
            type: [String]
        },
        cabinetLiquidCooling: {
            type: [String]
        },
        cabinetIOPanel: {type:String},
        memoryModelNumber: {type:String},
        memoryFormFactor: {type:String},
        memoryInterface: {type:String},
        memoryCapacity: {type:String},
        memorySpeed: {type:String},
        memoryDimensions: {type:String},
    }
}, {timestamps: true})

productSchema.pre('save', function(next) {
    if (this.productDiscount > 0) {
      this.currentPrice = this.price - (this.price * this.productDiscount / 100);
    } else {
      this.currentPrice = this.price;
    }
    next();
  });

const Product = mongoose.model("Product", productSchema);

export default Product;