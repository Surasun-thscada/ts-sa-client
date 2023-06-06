export enum CALENDAR_TYPE {
    INTERVAL = 0,
    DATE = 1,
    WEEK = 2,
    MONTH = 3,
    QUARTER = 4,
    YEAR = 5,
    INTERVAL_WITH_DATE_ONLY = 6,
}

export enum SELECT_DEVICE_LAYER {
    DEFAULT = 0,
    DEVICE = 1,
    SITE = 2,
    LOCATION = 3,
    CATEGORY = 4
}

export enum TS_DATA_LAYER_NODE_LEVEL {
    PROJECT = 1,
    CATEGORY = 2,
    LOCATION = 3,
    SITE = 4,
    DEVICE = 5
}

export enum STATUS_NODE_LEVEL {
    GROUP = 1,
    STATUS = 2
}

export enum SHIFT_NODE_LEVEL {
    GROUP = 1,
    SHIFT = 2
}

export enum IO_TYPE {
    ANALOG = 0,
    DIGITAL = 1,
    STATUS = 2,
    DATETIME = 3,
    TIME = 4,
    RUNTIME_SECOND = 5,
    RUNTIME_MILLISECOND = 6,
    COMM_STATUS = 100
}

export enum INDEX_LAYOUT_MODE {
    FULL = 1,
    SIMPLE = 2,
    CUSTOM = 3
}

export enum TOP_LEFT_MODE {
    IMAGE = 1,
    TEXT = 2
}

export enum HMI_RENDER_MODE {
    NORMAL = 0,
    FULLSCREEN = 1
}

export enum USER_ACCESS_LEVEL {
    CATEGORY = 1,
    LOCATION = 2,
    SITE = 3,
    DEVICE = 4
}

export enum ENERGY_PROFILE_TYPE {
    TOU = 'TOU',
    TOD = 'TOD',
    FLAT = 'FLAT',
    GENERIC = 'GENERIC'
}