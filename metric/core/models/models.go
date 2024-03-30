package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Task struct {
	Id uuid.UUID
	Metric    string
	Data      string
	UpdatedAt time.Time
	Groups []string
	AttemptedAt time.Time
	UpdateRate time.Duration
	IsDeleted bool
	IsPublic  bool   	// Tells if the snapshot data is allowed to be sent through gRPC API
	Weight 	  int
}

type TaskDB struct {
	ID string `gorm:"primaryKey"`
	Metric    string
	Data      string
	UpdatedAt time.Time
	Groups pq.StringArray `gorm:"type:text[]"`
	UpdateRate string
	IsPublic  bool
	Weight 	  int
}


type TaskCreate struct {
	Metric string
	UpdatedAt time.Time
	UpdateRate time.Duration
	Groups []string
	Weight int
	Data string
	IsPublic  bool
}

type MetricType struct {
	Name string
	Payload func()
}

type SnapshotParam struct {
	Name string
	Value string
}

type Snapshot struct {
	Metric string
	Data string
	Groups []string
	Error string
	IsPublic bool
	Params []SnapshotParam
	Timestamp time.Time
}

type SnapshotDB struct {
	gorm.Model
	Metric string
	Data string
	Error string
	IsPublic bool
	Groups []SnapshotGroupDB
	Params []SnapshotParamDB
}

// Sort of like a className in CSS,
// Used to group metrics by project or group of projects
// A snapshot can have multiple groups
type SnapshotGroupDB struct {
	gorm.Model
	Name string
	SnapshotDBID uint 
}

type SnapshotParamDB struct {
	gorm.Model
	Name string
	Value string
	SnapshotDBID uint
}