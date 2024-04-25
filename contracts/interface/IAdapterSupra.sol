// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

interface IAdapterSupra {
  function latestPrices(uint64 _pairIndex, uint8 decimals) external view returns (uint256 round, uint256 decimal, uint256 timestamp, uint256 price);
}