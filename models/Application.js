const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: String
  },
  type: {
    type: String
  },
  date: {
    date: {
      type: String,
      required: true
    },
    month: {
      type: Number
    },
    fullmonth: {
      type: String
    },
    year: {
      type: Number
    }
  },
  location: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'city'
    },
    province: {
      type: String
    },
    city: {
      type: String
    }
  },
  applicants: [
    {
      type: {
        type: String
      },
      status: {
        type: String
      },
      visa_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'visa'
      },
      visa_type: {
        //denormalized
        type: String
      },
      medical: {
        date: {
          type: String
        },
        is_upfront: {
          type: String,
          default: 'Requested'
        },
        approval_date: {
          type: String
        }
      },
      biometrics: {
        date: {
          type: String
        }
      }
    }
  ],
  consultant: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'consultant'
    },
    name: {
      //denormalized
      type: String
    }
  },
  college: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'college'
    },
    credential_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'credential'
    },
    name: {
      //denormalized
      type: String
    },
    credential: {
      //denormalized
      type: String
    }
  },
  response: {
    date: {
      type: String
    },
    month: {
      type: Number
    },
    fullmonth: {
      type: String
    },
    year: {
      type: Number
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'response'
    },
    visaoffice: {
      type: String
    }
  },
  passport: {
    date_sent: {
      type: String
    },
    date_received: {
      type: String
    },
    vac: {
      type: String
    }
  },
  comments: {
    type: String
  }
})

module.exports = Application = mongoose.model('application', ApplicationSchema)
