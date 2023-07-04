CREATE DATABASE IF NOT EXISTS {{_name}}

-- MARK: - Device

-- device stores device connection metadata
CREATE TABLE IF NOT EXISTS "device"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "device_type" TEXT NOT NULL,
    "device_name" TEXT NOT NULL,
    "role" INTEGER
);

CREATE TABLE IF NOT EXISTS "device_connection"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "device_id" INTEGER NOT NULL,
    "connected_at" DATETIME NOT NULL,
    "disconnected_at" DATETIME,
    FOREIGN KEY("device_id") REFERENCES "device"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "device_time"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "device_id" INTEGER NOT NULL,
    "reference_epoch" DOUBLE NOT NULL,
    FOREIGN KEY("device_id") REFERENCES "device"("id") ON DELETE CASCADE
);

-- MARK: - Experiments
CREATE TABLE IF NOT EXISTS "experiment" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "description" TEXT,
    "created_at" DATETIME NOT NULL,
    "start" DATETIME,
    "end" DATETIME,
    "uploaded" BOOLEAN,
    "active" BOOLEAN,
    "track_gps" BOOLEAN
);

CREATE TABLE IF NOT EXISTS "timemarker"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "experiment_id" INTEGER,
    "ts" DATETIME NOT NULL,
    "uploaded" BOOLEAN,
    FOREIGN KEY("experiment_id") REFERENCES "experiment"("id") ON DELETE CASCADE
);

-- MARK: - Device Configurations
CREATE TABLE IF NOT EXISTS "device_configuration"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "ts" INTEGER NOT NULL,
    "uploaded" BOOLEAN DEFAULT 0,
    "device_id" INTEGER,
{{#configValues}}
    "{{_name}}" {{_sqliteDataType}},
{{/configValues}}
    FOREIGN KEY("device_id") REFERENCES "device"("id") ON DELETE CASCADE
);

-- MARK: - Commands
-- TODO: implement storage for commands


-- MARK: - Data Streams
CREATE TABLE IF NOT EXISTS "data_stream"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL UNIQUE ON CONFLICT FAIL,
    "table_name" TEXT,
    "spec" BLOB NOT NULL,
    "created_at" DATETIME,
    "device_id" INTEGER NOT NULL,
    FOREIGN KEY("device_id") REFERENCES "device"("id") ON DELETE CASCADE
);

{{#dataStreams}}

CREATE TABLE IF NOT EXISTS "{{_name}}_configuration"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "ts" INTEGER NOT NULL,
    "uploaded" BOOLEAN DEFAULT 0,
    "device_id" INTEGER NOT NULL,
    {{#configValues}}
    "{{_name}}" {{_sqliteDataType}},
    {{/configValues}}
    FOREIGN KEY("device_id") REFERENCES "device"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "{{_name}}"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "ts" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "uploaded" BOOLEAN DEFAULT 0,
    "device_id" INTEGER NOT NULL,
    {{#dataValues}}
    "{{_name}}" {{_sqliteDataType}},
    {{/dataValues}}
    FOREIGN KEY("device_id") REFERENCES "device"("id") ON DELETE CASCADE
);

{{/dataStreams}}


-- MARK: - Throughput
CREATE TABLE IF NOT EXISTS "throughput"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "ts" INTEGER NOT NULL,
    "data_stream_id" INTEGER NOT NULL,
    "bytes" INTEGER,
    "device_id" INTEGER NOT NULL,
    FOREIGN KEY("device_id") REFERENCES "device"("id") ON DELETE CASCADE
    FOREIGN KEY("data_stream_id") REFERENCES "data_stream"("id")
);