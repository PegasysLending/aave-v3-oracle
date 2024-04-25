// SPDX-License-Identifier: MIT

import "./interface/ISupraSValueFeed.sol";
import "./interface/IAdapterSupra.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

pragma solidity ^0.8.24;

contract OracleAdapter is Initializable {
    ISupraSValueFeed public oracle;

    uint256 public pairIndex;
    bool public usdPair;
    uint8 public BASE_CURRENCY_UNIT;

    constructor() {}

    function initialize(
        address oracle_,
        uint256 pairIndex_,
        uint8 oracleUnit
    ) public initializer {
        require(oracle_ != address(0), "invalid oracle");
        oracle = ISupraSValueFeed(oracle_);
        pairIndex = pairIndex_;
        BASE_CURRENCY_UNIT = oracleUnit;
    }

    function latestAnswer() external view returns (int256) {
        ISupraSValueFeed.priceFeed memory data = oracle.getSvalue(pairIndex);
        int256 price = priceDecimals(
            data.price,
            uint8(data.decimals),
            BASE_CURRENCY_UNIT
        );
        return price;
    }

    function getTokenType() external pure returns (uint256) {
        return 1;
    }

    function priceDecimals(
        uint256 price,
        uint8 srcDecimals,
        uint8 decimals_
    ) internal pure returns (int256) {
        if (decimals_ > srcDecimals) {
            price = price * (10 ** (decimals_ - srcDecimals));
        } else if (decimals_ < srcDecimals) {
            price = price / (10 ** (srcDecimals - decimals_));
        }
        return int256(price);
    }

    function decimals() external view returns (uint8) {
        return BASE_CURRENCY_UNIT;
    }
}
