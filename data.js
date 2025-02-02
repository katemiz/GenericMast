let data = {


    "sys": {
        "horLoad":1000,
        "zOffset": 200,
    },

    "tubes": [
        {
            "no":1,
            "length": 1000,
            "od": 300,
            "thickness": 5,
            "density": 2710,
            'E':70E3,
            'wPayloadAdapter':1.2,
            'wFootFixedAdapter':1.2,
            'wFootRollerAdapter':1.5,
            'wHeadRollerAdapter':1.6,
            'hHead':70,
            'pAdapterHeadHeight':60
        },
        {
            "no":2,
            "length": 1000,
            "od": 280,
            "thickness": 4,
            "density": 2710,
            'E':70E3,
            'wPayloadAdapter':1.2,
            'wFootFixedAdapter':1.2,
            'wFootRollerAdapter':1.5,
            'wHeadRollerAdapter':1.6,
            'hHead':70,
            'pAdapterHeadHeight':60
        },
        {
            "no":3,
            "length": 1200,
            "od": 220,
            "thickness": 3,
            "density": 2710,
            'E':70E3,
            'wPayloadAdapter':1.2,
            'wFootFixedAdapter':1.2,
            'wFootRollerAdapter':1.5,
            'wHeadRollerAdapter':1.6,
            'hHead':70,
            'pAdapterHeadHeight':60
        },
        // {
        //     "no":4,
        //     "length": 8000,
        //     "od": 180,
        //     "thickness": 2,
        //     "density": 2710,
        //     'E':70E3,
        //     'wPayloadAdapter':1.2,
        //     'wFootFixedAdapter':1.2,
        //     'wFootRollerAdapter':1.5,
        //     'wHeadRollerAdapter':1.6,
        //     'hHead':70,
        //     'pAdapterHeadHeight':60
        // },
        // {
        //     "no":5,
        //     "length": 8000,
        //     "od": 170,
        //     "thickness": 2,
        //     "density": 2710,
        //     'E':70E3,
        //     'wPayloadAdapter':1.2,
        //     'wFootFixedAdapter':1.2,
        //     'wFootRollerAdapter':1.5,
        //     'wHeadRollerAdapter':1.6,
        //     'hHead':70,
        //     'pAdapterHeadHeight':60
        // },
        // {
        //     "no":6,
        //     "length": 8000,
        //     "od": 160,
        //     "thickness": 2,
        //     "density": 2710,
        //     'E':70E3,
        //     'wPayloadAdapter':1.2,
        //     'wFootFixedAdapter':1.2,
        //     'wFootRollerAdapter':1.5,
        //     'wHeadRollerAdapter':1.6,
        //     'hHead':70,
        //     'pAdapterHeadHeight':60
        // },

        



    ],

    "overlaps": [
        {
            "no":1,
            "length": 400,
        },
        {
            "no":2,
            "length": 400,
        },
        // {
            // "no":3,

        //     "length": 2000,
        // },
        // {
            // "no":4,
        //     "length": 1600,
        // },
        // {
        //      "no":5,
        //     "length": 1400,
        // },

        



    ],    





}


let originalData = JSON.parse(JSON.stringify(data))