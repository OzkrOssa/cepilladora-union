package repository

import (
	"changeme/backend/model"

	"gorm.io/gorm"
)

type WoodInterface interface {
	CreateWood(wood model.Wood) error
	UpdateWood(wood model.Wood) error
	DeleteWood(wood model.Wood) error
	GetWoodByID(wood model.Wood) (model.Wood, error)
	GetWoods() ([]model.Wood, error)
}

type WoodRepository struct {
	Database *gorm.DB
}

func NewWoodRepository(db *gorm.DB) WoodInterface {
	return &WoodRepository{
		Database: db,
	}
}

func (wr *WoodRepository) CreateWood(wood model.Wood) error {
	result := wr.Database.Create(&wood)
	return result.Error
}

func (wr *WoodRepository) UpdateWood(wood model.Wood) error {
	result := wr.Database.Save(&wood)
	return result.Error
}

func (wr *WoodRepository) DeleteWood(wood model.Wood) error {
	result := wr.Database.Delete(&wood)
	return result.Error
}

func (wr *WoodRepository) GetWoodByID(wood model.Wood) (model.Wood, error) {
	var w model.Wood
	result := wr.Database.Find(&w, wood.ID)
	if result.Error != nil {
		return model.Wood{}, result.Error
	}
	return w, nil
}

func (wr *WoodRepository) GetWoods() ([]model.Wood, error) {
	var woods []model.Wood
	result := wr.Database.Find(&woods)
	if result.Error != nil {
		return []model.Wood{}, result.Error
	}
	return woods, nil
}
