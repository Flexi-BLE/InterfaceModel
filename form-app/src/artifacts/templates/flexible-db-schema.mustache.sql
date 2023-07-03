CREATE DATABASE IF NOT EXISTS main;

-- MARK: - Device
-- device stores device connection metadata
CREATE TABLE "device"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "device_type" TEXT NOT NULL,
    "device_name" TEXT NOT NULL,
    "role" INTEGER,
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

-- experiments represent a range of time
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

-- timemarkers represent a a point in time
CREATE TABLE IF NOT EXISTS "timemarker"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "experiment_id" INTEGER,
    "ts" DATETIME NOT NULL,
    "uploaded" BOOLEAN,
    FOREIGN KEY("experiment_id") REFERENCES "experiment"("id") ON DELETE CASCADE
)


-- data streams
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

CREATE TABLE IF NOT EXISTS "{{name}}_configuration"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "ts" INTEGER NOT NULL,
    "uploaded" BOOLEAN DEFAULT 0,
    "device_id" INTEGER,
    FOREIGN KEY("device_id") REFERENCES "device"("id") ON DELETE CASCADE
    {{#configValues}}
    "{{pName}}" {{sqliteType}}
    {{/configValues}}
);

{{/dataStreams}}