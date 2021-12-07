export const entryIds = {
  aboutPage: "ckvfktt2o0th70b756b1ob23j",
  accessoriesPage: "ckts7kbk0722p0b745dvt8qn3",
  cardBalancePage: "ckregj5kokfxt0d762849d0oo",
  homePage: "ckrtolstcubny0b61tspdqkgr",
  kidsPage: "cktmfr160o7qw0b70faxh9g6d",
  mensPage: "cktjlwr205i4g0a20iyuvh3ef",
  womensPage: "cktmf0v1co68r0b706lgptnm1",
};

// WHEN ADDING A NEW QUERY MAKE SURE THAT IT DOES NOT HAVE A CLOSING CURLY BRACKET IN THE STRING
// THIS NEEDS TO BE DONE DUE TO THE WAY THE QUERY IS STRUCTURED IN THE NETLIFY SERVERLESS FUNCTION
// IF THE CURLY BRACKET IS LEFT IN THE STRING IT WILL CAUSE THE FUNCTION TO BUILD A BADLY
// STRUCTURED QUERY TO SEND GRAPHCMS RESULTING IN A BAD RESPONSE FROM THE API - USE THE EXISTING QUERIES AS
// AN EXAMPLE

export const aboutPageQuery = `
aboutPage(where: {id: "ckvfktt2o0th70b756b1ob23j"})  {
  heroHeaderText
  heroSubText
  heroImage {
    url
  }
  aboutContentBlock1 {
    html
    raw
  }
`;

export const categoryPageQuery = (id) => `
  categoryPage(where: {id: "${id}"}) {
    pageTitle
    heroHeaderText
    heroImage {
        url
    }
    storeBanner {
        bannerText
        bannerLink {
            text
            link
        }
        bannerStoreIcon {
            url
        }
    }
    filterContent {
        filterIcon {
            url
        }
        filterHeaderText
        noFiltersSelectedText
        clearAllText
        categoryOptionText
        categoryOptions {
            text
            link
        }
    }
    resultsText
    quickFilters
    topSellingText
`;

export const cardBalanceQuery = `
cardBalancePage(where: {id: "ckregj5kokfxt0d762849d0oo"}) {
  cardBalanceHeader
  cardNumberLabel
  cardNumberPlaceholder
  checkBalanceButtonText
  giftCardDisclaimerText
  pinLabel
  pinPlaceholder
  preFetchedBalanceText
  yourBalanceText
`;

export const homePageQuery = `
indexPage(where: {id: "ckrtolstcubny0b61tspdqkgr"}) {
  heroBogoBootIcon {
    url
  }
  heroButton {
    text,
    link,
    externalLink
  }
  heroImage {
    url
  }
  heroHeaderText
  heroSubText
  bootFactoryLogos {
    url
  }
  newSiteMessageInfoText
  newSiteMessageText
  newSiteSubMessageText
  viewStoresButton {
    link
    text
  }
  categoryCards {
    cardImage {
      url
    }
    cardHeaderText
    cardLinkText
    cardLink
  }
  productHighlightImage {
      url
  }
  productCardsHeaderText
  productHighlightBrandText
  productHighlightDescriptionText
  productHighlightHeaderText
  productHighlightButton {
      link
      text
  }
  storesHeaderText
  storesSubHeaderText
  storesDescriptionText
  storesButton {
      link
      text
  }
  storeImage {
      url
  }
  cookiesBannerText
  acceptButtonText
  optOutButtonText
  cookiesModalHeader
  cookiesModalOptOutText
  cookiesModalBrowserText
  cookiesModalCancelButtonText
  cookiesModalOptOutButtonText
  cookiesModalDisclaimerText
`;

export const sharedQuery = `
  shared {
    navbar {
        navbarContent {
            dropdownIdentifier
            sectionHeader
            sectionHeaderLink
            navbarItems {
                itemHeader
                navbarSubitems {
                    text
                    link
                }
            }
        }
        mobileHamburgerLogo {
            url
        }
        cartIconBlack {
            url
        }
        cartIconWhite {
            url
        }
        bootFactoryLogo {
            url
        }
        desktopHeaders {
            hasDropdown
            headerLink {
                link
                text
            }
        }
        aboutLink {
            text
            link
        }
        helpLink {
            text
            link
        }
        viewCartText
    }
    footer {
        footerHeader
        footerSubHeader
        infoLinksHeader
        infoLinks {
            link
            text
        }
        emailSubscriptionInput {
            label
            placeholder
            errorContent
        }
        bootFactoryLogos {
            url
        }
        socialMediaLinks {
            imageOrAsset {
                url
            }
            link
            externalLink
        }
        copyrightText
      }
    buyOneGetTwoBanner {
        buyOneGetTwoText
        modalHeader
        modalContent
        continueButtonText
        policiesButton {
            text
            link
        }
        bootsIconWhite {
            url
        }
        bootsIconRed {
            url
        }
        infoIconWhite {
            url
        }
        infoIconBlack {
            url
        }
     }
  }
`;

export default {
  aboutPageQuery,
  categoryPageQuery,
  cardBalanceQuery,
  entryIds,
  homePageQuery,
  sharedQuery
}