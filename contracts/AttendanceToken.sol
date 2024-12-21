// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CollaborativeAnimation {
    struct AnimationFrame {
        uint256 id;
        address creator;
        string frameData; // Encoded data for the animation frame
        uint256 timestamp;
    }

    struct User {
        uint256 contributionCount;
        uint256 tokensEarned;
    }

    address public owner;
    uint256 public nextFrameId;
    uint256 public totalTokens;
    uint256 public tokenRewardPerFrame = 10;

    mapping(uint256 => AnimationFrame) public frames;
    mapping(address => User) public users;

    event FrameAdded(uint256 frameId, address creator, string frameData, uint256 timestamp);
    event TokensClaimed(address user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addFrame(string memory frameData) public {
        require(bytes(frameData).length > 0, "Frame data cannot be empty");

        AnimationFrame memory newFrame = AnimationFrame({
            id: nextFrameId,
            creator: msg.sender,
            frameData: frameData,
            timestamp: block.timestamp
        });

        frames[nextFrameId] = newFrame;
        users[msg.sender].contributionCount++;
        users[msg.sender].tokensEarned += tokenRewardPerFrame;
        totalTokens += tokenRewardPerFrame;

        emit FrameAdded(nextFrameId, msg.sender, frameData, block.timestamp);

        nextFrameId++;
    }

    function claimTokens() public {
        uint256 tokens = users[msg.sender].tokensEarned;
        require(tokens > 0, "No tokens to claim");

        users[msg.sender].tokensEarned = 0;

        emit TokensClaimed(msg.sender, tokens);

        // Add token transfer logic here if using an ERC-20 token
    }

    function setTokenRewardPerFrame(uint256 reward) public onlyOwner {
        tokenRewardPerFrame = reward;
    }

    function getUserDetails(address user) public view returns (User memory) {
        return users[user];
    }

    function getFrameDetails(uint256 frameId) public view returns (AnimationFrame memory) {
        return frames[frameId];
    }
}
