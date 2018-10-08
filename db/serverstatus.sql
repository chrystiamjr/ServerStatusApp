-- MySQL Script generated by MySQL Workbench
-- Dom 07 Out 2018 20:56:48 -03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema serverstatus
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `serverstatus` ;

-- -----------------------------------------------------
-- Schema serverstatus
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `serverstatus` DEFAULT CHARACTER SET utf8 ;
USE `serverstatus` ;

-- -----------------------------------------------------
-- Table `serverstatus`.`templog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `serverstatus`.`templog` ;

CREATE TABLE IF NOT EXISTS `serverstatus`.`templog` (
  `idtemplog` INT NOT NULL,
  `horario` DATETIME NOT NULL,
  `temperatura` INT(11) NOT NULL,
  `umidade` FLOAT NOT NULL,
  PRIMARY KEY (`idtemplog`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `serverstatus`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `serverstatus`.`usuario` ;

CREATE TABLE IF NOT EXISTS `serverstatus`.`usuario` (
  `idusuario` INT(11) NOT NULL,
  `username` VARCHAR(80) NOT NULL,
  `senha` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`idusuario`));


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;