
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 04/15/2021 08:36:54
-- Generated from EDMX file: D:\20181129002 II\internet pro\hastaportali\hastaportali\Models\Modeldb.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [db01];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[HastaKayit]', 'U') IS NOT NULL
    DROP TABLE [dbo].[HastaKayit];
GO
IF OBJECT_ID(N'[dbo].[HastaSaglik]', 'U') IS NOT NULL
    DROP TABLE [dbo].[HastaSaglik];
GO
IF OBJECT_ID(N'[dbo].[Mesaj]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Mesaj];
GO
IF OBJECT_ID(N'[dbo].[Randevu]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Randevu];
GO
IF OBJECT_ID(N'[dbo].[Recete]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Recete];
GO
IF OBJECT_ID(N'[dbo].[Sonuc]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Sonuc];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'HastaKayits'
CREATE TABLE [dbo].[HastaKayits] (
    [Kimlik] nvarchar(10)  NOT NULL,
    [AdSoyad] nvarchar(40)  NOT NULL,
    [DogumTarihi] datetime  NOT NULL,
    [E_posta] nvarchar(50)  NOT NULL,
    [Telefon] nvarchar(10)  NOT NULL
);
GO

-- Creating table 'HastaSagliks'
CREATE TABLE [dbo].[HastaSagliks] (
    [Kimlik] nvarchar(10)  NOT NULL,
    [Yas] nchar(3)  NOT NULL,
    [Uzunluk] nchar(3)  NOT NULL,
    [Agarlik] nchar(3)  NOT NULL,
    [KanGrubu] nvarchar(5)  NOT NULL,
    [Tansiyon] nchar(3)  NOT NULL,
    [Nabiz] nchar(3)  NOT NULL,
    [SolunumSayisi] nchar(3)  NOT NULL,
    [Sicaklik] nchar(3)  NOT NULL,
    [Diyet] nchar(10)  NOT NULL,
    [Alerji] nvarchar(50)  NOT NULL
);
GO

-- Creating table 'Mesajs'
CREATE TABLE [dbo].[Mesajs] (
    [Kimlik] nvarchar(10)  NOT NULL,
    [GonderilenMesaj] varchar(max)  NOT NULL,
    [GelenMesaj] varchar(max)  NOT NULL
);
GO

-- Creating table 'Randevus'
CREATE TABLE [dbo].[Randevus] (
    [Kimlik] nvarchar(10)  NOT NULL,
    [RandevuSaati] time  NOT NULL,
    [RandevuTarihi] datetime  NOT NULL,
    [RandevuBolum] nvarchar(50)  NOT NULL,
    [RandevuDoktor] nvarchar(50)  NOT NULL
);
GO

-- Creating table 'Recetes'
CREATE TABLE [dbo].[Recetes] (
    [Kimlik] nvarchar(10)  NOT NULL,
    [IlacAdi] varchar(50)  NULL,
    [Miktarlar] varchar(50)  NULL,
    [Doz] nchar(10)  NULL,
    [Sure] nchar(10)  NULL,
    [IlacNo] nchar(10)  NULL
);
GO

-- Creating table 'Sonucs'
CREATE TABLE [dbo].[Sonucs] (
    [Kimlik] nvarchar(10)  NOT NULL,
    [Sonuc1] varchar(max)  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Kimlik] in table 'HastaKayits'
ALTER TABLE [dbo].[HastaKayits]
ADD CONSTRAINT [PK_HastaKayits]
    PRIMARY KEY CLUSTERED ([Kimlik] ASC);
GO

-- Creating primary key on [Kimlik] in table 'HastaSagliks'
ALTER TABLE [dbo].[HastaSagliks]
ADD CONSTRAINT [PK_HastaSagliks]
    PRIMARY KEY CLUSTERED ([Kimlik] ASC);
GO

-- Creating primary key on [Kimlik] in table 'Mesajs'
ALTER TABLE [dbo].[Mesajs]
ADD CONSTRAINT [PK_Mesajs]
    PRIMARY KEY CLUSTERED ([Kimlik] ASC);
GO

-- Creating primary key on [Kimlik] in table 'Randevus'
ALTER TABLE [dbo].[Randevus]
ADD CONSTRAINT [PK_Randevus]
    PRIMARY KEY CLUSTERED ([Kimlik] ASC);
GO

-- Creating primary key on [Kimlik] in table 'Recetes'
ALTER TABLE [dbo].[Recetes]
ADD CONSTRAINT [PK_Recetes]
    PRIMARY KEY CLUSTERED ([Kimlik] ASC);
GO

-- Creating primary key on [Kimlik] in table 'Sonucs'
ALTER TABLE [dbo].[Sonucs]
ADD CONSTRAINT [PK_Sonucs]
    PRIMARY KEY CLUSTERED ([Kimlik] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------